from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    name = db.Column(db.String(100))
    empresa_id = db.Column(db.Integer, db.ForeignKey('empresas.id'))
    empresa = db.relationship('Empresa', backref=('users'), lazy=True)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<Users {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
class Empresa (db.Model):
    __tablename__ = 'empresas'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    servicios = db.relationship('Servicio', backref='empresa', lazy=True)

    def __repr__(self):
        return f'<Empresa{self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
        }


class Servicio(db.Model):
    __tablename__ = 'servicios'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    empresa_id = db.Column(db.Integer, db.ForeignKey('empresas.id'))
    

    def __repr__(self):
        return f'<Servicio {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "empresa_id": self.empresa_id,
        }

class GestorCitas(db.Model):
    __tablename__ = 'gestor_citas'
    id = db.Column(db.Integer, primary_key =True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    servicio_id = db.Column(db.Integer, db.ForeignKey('servicios.id'))
    fecha = db.Column(db.DateTime)
    users = db.relationship('Users', backref=('gestor_citas'))
    servicio = db.relationship('Servicio', backref =('gestor_citas'), lazy=True )

    def __repr__(self):
        return f'<GestorCitas {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "servicio_id": self.servicio_id,
        }
        