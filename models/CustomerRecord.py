from handlers.DatabaseHandler import db
from flask_restful import Resource
from flask import jsonify, request
from handlers.ApiHandler import api
from models import UserSession
import bcrypt
import string
import random


class CustomerRecord(db.Model):
    customer_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), unique=True)
    last_name = db.Column(db.String(80), unique=True)
    email = db.Column(db.String(80), unique=True)
    contact = db.Column(db.String(80), unique=True)


class CustomerRes(Resource):
    def post(self):
        json = request.get_json(force=True)
        first_name = json['first_name']
        last_name = json['last_name']
        email = json['email']
        contact = json['contact']

        new_cust = CustomerRecord(first_name=first_name, last_name=last_name, email=email, contact=contact)
        db.session.add(new_cust)
        db.session.commit()

        if new_cust.customer_id is None:
            return jsonify(status=False, message="An error occurred please try again")
        return jsonify(status=True)


api.add_resource(CustomerRes, '/customer')
