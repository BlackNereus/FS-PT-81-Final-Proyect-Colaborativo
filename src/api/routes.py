"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, session, redirect
from api.models import db, Users, Empresa, GestorCitas, Servicio
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
from google_auth_oauthlib.flow import Flow
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import base64
import os

api = Blueprint('api', __name__)
gmail_routes = Blueprint('gmail_routes', __name__)

# gmail routes

@gmail_routes.route('/authorize')
def authorize():
    # Configuración de OAuth2
    flow = Flow.from_client_secrets_file(
        'src/client_secret.json',
        scopes=['https://www.googleapis.com/auth/gmail.send'],
        redirect_uri=url_for('gmail_routes.oauth2callback', _external=True)  # Usamos 'gmail_routes' para hacer referencia al Blueprint
    )
    authorization_url, state = flow.authorization_url()
    session['state'] = state
    return redirect(authorization_url)

@gmail_routes.route('/oauth2callback')
def oauth2callback():
    state = session['state']
    flow = Flow.from_client_secrets_file(
        'src/client_secret.json',
        scopes=['https://www.googleapis.com/auth/gmail.send'],
        state=state,
        redirect_uri=url_for('gmail_routes.oauth2callback', _external=True)
    )
    flow.fetch_token(authorization_response=request.url)
    credentials = flow.credentials
    session['credentials'] = credentials_to_dict(credentials)
    return redirect(url_for('gmail_routes.send_mail'))

@api.route('/oauth2callback')
def oauth2callback():
    state = session.get('state')
    if not state:
        return jsonify({"error": "Estado de sesión inválido"}), 400

    flow = Flow.from_client_secrets_file(
        'src/client_secret.json',
        scopes=['https://www.googleapis.com/auth/gmail.send'],
        state=state,
        redirect_uri=url_for('api.oauth2callback', _external=True)
    )
    flow.fetch_token(authorization_response=request.url)
    credentials = flow.credentials
    session['credentials'] = credentials_to_dict(credentials)

    # Obtener el correo electrónico del usuario autenticado
    try:
        service = build('gmail', 'v1', credentials=credentials)
        profile = service.users().getProfile(userId='me').execute()
        email = profile['emailAddress']
        session['user_email'] = email  # Guardar en sesión
        return jsonify({"msg": "Autenticación exitosa", "email": email}), 200
    except Exception as e:
        print(f'Error al obtener el perfil: {e}')
        return jsonify({"error": "No se pudo obtener el perfil"}), 500

@gmail_routes.route('/send_mail', methods=['POST'])
def send_mail():
    credentials_info = session.get('credentials')
    user_email = session.get('user_email')  # Usar correo autenticado
   
    print("Credenciales:", credentials_info)
    print("Correo del usuario:", user_email)

    if not credentials_info or not user_email:
        return jsonify({"error": "Usuario no autenticado"}), 401

    credentials = Credentials.from_authorized_user_info(info=credentials_info)
    service = build('gmail', 'v1', credentials=credentials)

    # Información del correo
    to_email = request.json.get('to')
    subject = request.json.get('subject')
    body = request.json.get('body')

    if not to_email or not subject or not body:
        return jsonify({"error": "Faltan parámetros en la solicitud"}), 400

    message = create_message(user_email, to_email, subject, body)
    try:
        send_message(service, "me", message)
        return jsonify({"msg": "Correo enviado con éxito"}), 200
    except Exception as error:
        print(f'Error al enviar correo: {error}')
        
        return jsonify({"error": "No se pudo enviar el correo"}), 500




# Función para crear el mensaje
def create_message(sender, to, subject, body):
    message = MIMEMultipart()
    message['to'] = to
    message['from'] = sender
    message['subject'] = subject
    msg = MIMEText(body)
    message.attach(msg)
    raw_message = base64.urlsafe_b64encode(message.as_bytes()).decode()
    return {'raw': raw_message}

# Función para enviar el mensaje
def send_message(service, sender, message):
    try:
        message = service.users().messages().send(userId=sender, body=message).execute()
        print(f'Mensaje enviado: {message["id"]}')
    except Exception as error:
        print(f'Ocurrió un error: {error}')
        return 'Ocurrió un error al enviar el correo'

# Función para convertir las credenciales a un diccionario
def credentials_to_dict(credentials):
    return {
        'token': credentials.token,
        'refresh_token': credentials.refresh_token,
        'token_uri': credentials.token_uri,
        'client_id': credentials.client_id,
        'client_secret': credentials.client_secret,
        'scopes': credentials.scopes
    }
#

CORS(api)


@api.route('/users', methods=['GET'])
def get_users():
   data = Users.query.all()
   users = [users.serialize() for users in data]
   return jsonify ({"msg":"Ok", "data":users}), 200

@api.route('/user', methods=['GET'])
@jwt_required()
def one_user(): 
   id = get_jwt_identity()
   print({request.headers})
   print(id)
   user = Users.query.get(id)  
   if user is None:
        return jsonify({"msg": f"No user found with id {id}, the database might be empty"}), 404
   return jsonify({"msg": "one user with id:" + str(id), "user": user.serialize()}), 200

@api.route('/users', methods=['POST'])
def create_user():
   email = request.json.get('email', None)
   password = request.json.get('password', None)
   name = request.json.get('name', None)
   if not email or not password or not name:
      return jsonify ({"msg":"All fields is required"}), 400
   check = Users.query.filter_by(email=email).first()
   if check:
      return jsonify ({"msg":"User already exist"}), 400
   new_user = Users(email=email, password=password, name=name, is_active=True)
   db.session.add(new_user)
   db.session.commit()
   return jsonify({"msg": "OK", "data": new_user.serialize()}), 201

@api.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
   user = Users.query.get(id)
   if not user:
      return jsonify({"msg":"No user found with id:" + str(id)}), 404
   db.session.delete(user)
   db.session.commit()
   return jsonify({"msg": "deleted user with id:" + str(id)}), 200



@api.route('/user/<int:id>', methods=['PUT'])
def update_user(id):
   user = Users.query.get(id)
   if user is None:
    return jsonify ({"msg":"no user found with id:" + str(id)}), 404
   data = request.json
   name = data.get('name')
   lastname  =data.get('lastname')
   if not name and not lastname:
      return jsonify({"msg": "at least one field ( email or password ) must be provided"}), 400
   if name:
      user.name = name
   if lastname:
      user.lastname = lastname
      return jsonify ({"msg": "User with id {id} updated successfully", "user": user.serialize()}), 200

   db.session.commit()
   return jsonify({"msg": f"User with id {id} updated successfully", "user": user.serialize()}), 200
   


@api.route('/company', methods=['GET'])
def get_company():
   data = Empresa.query.all()
   empresas = [empresas.serialize() for empresas in data]
   return jsonify({"msg":"Ok", "data":empresas}), 200

@api.route('/company/<int:id>', methods=['GET'])
def one_company(id):
   company = Empresa.query.get(id)
   if company is None:
        return jsonify({"msg": "No company found with id {id}, the data base might be empty"}), 404
   print(company)
   return jsonify({"msg": "one company with id:" + str(id), "user":company.serialize()}), 200

@api.route('/company', methods=['POST'])
def create_company():
   address = request.json.get('address', None)
   city = request.json.get('city', None)
   email = request.json.get('email', None)
   
   if not address or not city or not email :
      return jsonify ({"msg":"All the fields are required"}), 400
   check = Empresa.query.filter_by(email=email).first()
   if check:
      return jsonify ({"msg":"company already exists"}), 400
   new_company = Empresa(address=address, city=city, email=email)
   db.session.add(new_company)
   db.session.commit()
   return jsonify ({"msg":"OK", "data": new_company.serialize()})

@api.route('/company/<int:id>', methods=['DELETE'])
def delete_company(id):
   empresa = Empresa.query.get(id)
   if not empresa:
      return jsonify({"msg":"No company found with id:" + str(id)}), 404
   db.session.delete(empresa)
   db.session.commit()
   return jsonify({"msg": "deleted with id:" + str(id)}), 200

@api.route('/company/<int:id>', methods=['PUT'])
def update_company(id):
   company = Empresa.query.get(id)
   if company is None:
    return jsonify ({"msg":"no company found with id:" + str(id)}), 404
   data = request.json
   email = data.get('email')
   address = data.get('address')
   city = data.get('city')
   if not email:
      return jsonify({"msg": "at least one field must be provided"}), 400
   if email:
      company.email = email
   if address:
      company.address = address
   if city:
      company.city = city
      db.session.commit()
      return jsonify ({"msg": "company with id updated successfully", "company": company.serialize()}), 200

@api.route('/service', methods=['GET'])
def get_services():
   data = Servicio.query.all()
   servicio = [servicio.serialize() for servicio in data]
   return jsonify({"msg":"Ok", "data":servicio}), 200

@api.route('/service/<int:id>', methods=['GET'])
def one_servicio(id):
   servicio = Servicio.query.get(id)
   if servicio is None:
        return jsonify({"msg": "No service found with id, the data base might be empty"}), 404
   print(servicio)
   return jsonify({"msg": "one user with id:" + str(id), "servicio":servicio.serialize()}), 200

@api.route('/service', methods=['POST'])
def create_service():
   servicio = request.json.get('servicio', None)
   descripcion = request.json.get('descripcion', None)
   precio = request.json.get('precio', None)
   if not servicio or not descripcion or not precio:
      return jsonify ({"msg":"All fields is required"}), 400
   check = Servicio.query.filter_by(servicio=servicio).first()
   if check:
      return jsonify ({"msg":"Service already exist"}), 400
   new_service = Servicio(servicio=servicio, descripcion=descripcion, precio=precio)
   db.session.add(new_service)
   db.session.commit()
   return jsonify({"msg": "OK", "data": new_service.serialize()}), 201

@api.route('/service/<int:id>', methods=['DELETE'])
def delete_service(id):
   servicio = Servicio.query.get(id)
   if not servicio:
      return jsonify({"msg":"No service found with id:" + str(id)}), 404
   db.session.delete(servicio)
   db.session.commit()
   return jsonify({"msg": "deleted with id:" + str(id)}), 200

@api.route('/service/<int:id>', methods=['PUT'])
def update_service(id):
   servicio = Servicio.query.get(id)
   if servicio is None:
    return jsonify ({"msg":"no company found with id:" + str(id)}), 404
   data = request.json
   nombre_servicio = data.get('nombre_servicio')
   descripcion = data.get('descripcion')
   precio = data.get('precio')
   if not servicio:
      return jsonify({"msg": "at least one field must be provided"}), 400
   if servicio:
      servicio.nombre_servicio = nombre_servicio
   if descripcion:
      servicio.descripcion = descripcion
   if precio:
      servicio.precio = precio
      db.session.commit()
      return jsonify ({"msg": "company with id updated successfully", "company": servicio.serialize()}), 200


@api.route('/citas', methods=['GET'])
def get_cita():
   data = GestorCitas.query.all()
   citas = [citas.serialize() for citas in data]
   return jsonify ({"msg":"Ok", "data":citas}), 200

@api.route('/citas/<int:id>', methods=['GET'])
def one_cita(id):
   citas = GestorCitas.query.get(id)
   if citas is None:
        return jsonify({"msg": "No user found with id {id}, the data base might be empty"}), 404
   print(citas)
   return jsonify({"msg": "one user with id:" + str(id), "user":citas.serialize()}), 200

@api.route('/citas', methods=['POST'])
def create_cita():
   fecha = request.json.get('fecha', None)
   users = request.json.get('users', None)
   if not fecha or not users:
      return jsonify ({"msg":"All fields is required"}), 400
   check = GestorCitas.query.filter_by(fecha=fecha).first()
   if check:
      return jsonify ({"msg":"User already exist"}), 400
   new_cita = GestorCitas(fecha=fecha, users=users, is_active=True)
   db.session.add(new_cita)
   db.session.commit()
   return jsonify({"msg": "OK", "data": new_cita.serialize()}), 201

@api.route('/citas/<int:id>', methods=['DELETE'])
def delete_cita(id):
   cita = GestorCitas.query.get(id)
   if not cita:
      return jsonify({"msg":"No company found with id:" + str(id)}), 404
   db.session.delete(cita)
   db.session.commit()
   return jsonify({"msg": "deleted with id:" + str(id)}), 200

@api.route('/citas/<int:id>', methods=['PUT'])
def update_cita(id):
   cita = GestorCitas.query.get(id)
   if cita is None:
    return jsonify ({"msg":"no date found with id:" + str(id)}), 404
   data = request.json
   fecha = data.get('fecha')
   if not fecha:
      return jsonify({"msg": "at least one field ( email or password ) must be provided"}), 400
   if fecha:
      cita.fecha = fecha

      db.session.commit()
      return jsonify ({"msg": "company with id {id} updated successfully", "company": cita.serialize()}), 200



@api.route('/register', methods=['POST'])
def register():
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if not email or not password:
        return jsonify({"msg": "missing data"}), 400
    exist = Users.query.filter_by(email=email).first()
    if exist:
        return jsonify({"msg": "email taken"}), 400
    hashed_password = generate_password_hash(password)
    new_user = Users(email=email, password=hashed_password, is_active=True)
    db.session.add(new_user)
    db.session.commit()
    token = create_access_token(identity=str(new_user.id))
    return jsonify({"msg": 'ok', 'token': token})


@api.route('/login', methods=['POST'])
def login():
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if not email or not password:
        return jsonify({"msg": "missing data"}), 400
    exist = Users.query.filter_by(email=email).first()
    if not exist:
        return jsonify({"msg": "user doesnt exist"}), 400
    
    check_password_hash(exist.password, password)
    
    if not check_password_hash:
        return jsonify({"msg": "Incorrect password"}), 400

   
    token = create_access_token(identity=exist.id)
    return jsonify({"msg": 'ok', 'token': token, "user": exist.serialize()})

@api.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    id = get_jwt_identity()
    print('user identity->', id)
    user = Users.query.get(id)
    return jsonify({"msg":"OK", "user": user.serialize()})