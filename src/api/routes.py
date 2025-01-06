"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Users, Empresa, Servicio, GestorCitas
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/users', methods=['GET'])
def get_users():
    data = Users.query.all()
    users = [users.serialize() for users in data]
    return jsonify({"msg": "OK", "data":users}), 200

@api.route('/users/<int:id>', methods=['GET'])
def one_user(id):
   user = Users.query.get(id)
   if user is None:
        return jsonify({"msg": "No user found with id {id}, the data base might be empty"}), 404
   print(user)
   return jsonify({"msg": "one user with id:" + str(id), "user":user.serialize()}), 200

@api.route('/users', methods=['POST'])
def create_user():
   email = request.json.get('email', None)
   password = request.json.get('password', None)
   if not email or not password:
      return jsonify ({"msg":"All fields is required"}), 400
   check = Users.query.filter_by(email=email).first()
   if check:
      return jsonify ({"msg":"User already exist, please login"}), 400
   new_user = Users(email=email, password=password, is_active=True)
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

@api.route('/users/<int:id>', methods=['PUT'])
def update_user():
   user = Users.query.all(id)
   if user is None:
    return jsonify ({"msg":"no user found with id:" + str(id)})

@api.route('/company', methods=['GET'])
def get_company():
   data = Empresa.query.all()
   empresas = [empresas.serialize() for empresas in data]
   return jsonify({"msg":"Ok", "data":empresas}), 200

@api.route('/company/<int:id>', methods=['GET'])
def one_company(id):
   company = Empresa.query.get(id)
   if company is None:
        return jsonify({"msg": "No user found with id {id}, the data base might be empty"}), 404
   print(company)
   return jsonify({"msg": "one company with id:" + str(id), "user":company.serialize()}), 200

@api.route('/company', methods=['POST'])
def create_company():
   email = request.json.get('email', None)
   password = request.json.get('password', None)
   if not email or not password :
      return jsonify ({"msg":"All the fields are required"}), 400
   check = Empresa.query.filter_by(email=email).first()
   if check:
      return jsonify ({"msg":"User already exist, please login"}), 400
   new_company = Users(email=email, password=password, is_active=True)
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



@api.route('/service', methods=['GET'])
def get_services():
   data = Servicio.query.all()
   servicio = [servicio.serialize() for servicio in data]
   return jsonify({"msg":"Ok", "data":servicio}), 200
   


@api.route('/gestorcitas', methods=['GET'])
def get_cita():
   data = GestorCitas.query.all()
   citas = [citas.serialize() for citas in data]
   return jsonify ({"msg":"Ok", "data":citas}), 200



if __name__ == '__main__':
  api.run(host='0.0.0.0', port=3245, debug=True)