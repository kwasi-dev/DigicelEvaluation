from handlers.DatabaseHandler import db
from flask_restful import Resource
from flask import jsonify, request
from handlers.ApiHandler import api
from models import UserSession


def hash_password(password):
    return password


def generate_session_token():
    return "mtriemitmreimtjgkrelmtg"


class User(db.Model):
    agent_id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), unique=True)
    username = db.Column(db.String(20), unique=True)
    password = db.Column(db.String(80))


class UserReg(Resource):
    def post(self):
        json = request.get_json(force=True)
        username = json['username']
        password = json['password']
        email = json['email']

        qry = User.query.filter((User.username == username) | (User.email == email)).first()

        if qry is None:
            new_user = User(email=email, username=username, password=hash_password(password))
            db.session.add(new_user)
            db.session.commit()
            return jsonify(status=True)
        return jsonify(status=False, message="A user with that username or email already exists")


class UserLogin(Resource):
    def post(self):
        json = request.get_json(force=True)
        username = json['username']
        password = json['password']

        qry = User.query.filter((User.username == username), (User.password == hash_password(password))).first()

        if qry is None:
            return jsonify(status=False, message="Incorrect credentials!")

        token = generate_session_token()
        new_login = UserSession.UserSession(agent_id=qry.agent_id, session_token=token)
        db.session.add(new_login)
        db.session.commit()
        return jsonify(status=True, token=token)


api.add_resource(UserReg, '/register')
api.add_resource(UserLogin, '/login')
