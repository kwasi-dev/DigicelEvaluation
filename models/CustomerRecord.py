from handlers.DatabaseHandler import db
from flask_restful import Resource
from flask import jsonify, request
from handlers.ApiHandler import api
import json

class CustomerRecord(db.Model):
    customer_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80))
    last_name = db.Column(db.String(80))
    email = db.Column(db.String(80))
    contact = db.Column(db.String(80))


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

    def get(self):
        all_customers = db.session.query(CustomerRecord).all()
        return [
            {"customer_id":x.customer_id,
             "firstName": x.first_name,
             "lastName":x.last_name,
             "email": x.email,
             "contact": x.contact
             }
            for x in all_customers]


class LoadTestData(Resource):
    def get(self):
        import pandas as pd
        import random

        excel = pd.ExcelFile('testCustomers.xlsx')
        sheet = excel.parse('Sheet1')

        def generate_phone():
            second = str(random.randint(1, 888)).zfill(3)

            last = (str(random.randint(1, 9999)).zfill(4))

            return '868-{}-{}'.format(second, last)

        for idx, row in sheet.iterrows():
            f_name = row['FirstName']
            l_name = row['LastName']
            email = row['Email']
            number = generate_phone()
            new_cust = CustomerRecord(first_name=f_name, last_name=l_name, email=email, contact=number)
            db.session.add(new_cust)
        db.session.commit()
        return "ok"


api.add_resource(CustomerRes, '/customer')
api.add_resource(LoadTestData, '/loadTestData')
