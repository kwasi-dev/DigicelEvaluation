from handlers.DatabaseHandler import db
from flask_restful import Resource
from flask import jsonify, request
from handlers.ApiHandler import api


def hash_password(password):
    return password


class User(db.Model):
    agent_id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), unique=True)
    username = db.Column(db.String(20), unique=True)
    password = db.Column(db.String(80))


class UserRes(Resource):
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


api.add_resource(UserRes, '/register')
