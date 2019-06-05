from handlers.DatabaseHandler import db
from flask_restful import Resource
from flask import jsonify, request
from handlers.ApiHandler import api
from models import UserSession
import bcrypt
import string
import random


def hash_password(password):
    return bcrypt.hashpw(password.encode('utf8'), bcrypt.gensalt())


def verify_password(password, hashed):
    return bcrypt.checkpw(password.encode('utf8'), hashed)


def generate_session_token(token_len):
    # Generate some random token here
    letters = string.ascii_letters + string.digits
    return ''.join((random.choice(letters) for i in range(token_len)))


class User(db.Model):
    agent_id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), unique=True)
    username = db.Column(db.String(20), unique=True)
    password = db.Column(db.LargeBinary())


class UserAPI(Resource):
    def get(self):
        get_params = request.args

        sess_id = get_params['id']

        qry = UserSession.get_user_by_session(sess_id)

        if qry is None:
            return jsonify(status=False, message="Your session has expired, please login again")

        user = User.query.filter(User.agent_id == qry.agent_id).first()

        return jsonify(status=True, email=user.email)


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

        qry = User.query.filter(User.username == username).first()

        if qry is None:
            return jsonify(status=False, message="Incorrect credentials!")

        if not verify_password(password, qry.password):
            return jsonify(status=False, message="Incorrect credentials!")

        token = generate_session_token(50)
        new_login = UserSession.UserSession(agent_id=qry.agent_id, session_token=token)
        db.session.add(new_login)
        db.session.commit()
        return jsonify(status=True, token=token)


api.add_resource(UserReg, '/register')
api.add_resource(UserLogin, '/login')
api.add_resource(UserAPI, '/user', )
