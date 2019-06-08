from handlers.DatabaseHandler import db
from flask_restful import Resource
from flask import jsonify, request
from handlers.ApiHandler import api


class ServiceRecord(db.Model):
    service_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True)
    price = db.Column(db.Numeric(10, 2))


class ServiceRest(Resource):
    def get(self):
        all_sub = ServiceRecord.query.all()
        return [
            {"service_id": x.service_id,
             "name": x.name,
             "price": str(x.price)
             }
            for x in all_sub]


api.add_resource(ServiceRest, '/subscription')  
