from handlers.DatabaseHandler import db
from flask_restful import Resource
from handlers.ApiHandler import api


class CustomerSubscription(db.Model):
    customer_id = db.Column(db.Integer, primary_key=True)
    service_id = db.Column(db.Integer, primary_key=True)


class CustomerSubscriptionRest(Resource):
    def get(self, customer_id):
        if customer_id:
            all_customer_sub = CustomerSubscription.query.filter(CustomerSubscription.customer_id == customer_id).all()
            return [
                {"customer_id": x.customer_id,
                 "service_id": x.service_id
                 }
                for x in all_customer_sub]

    def put(self, customer_id):
        json = request.get_json(force=True)
        first_name = json['first_name']
        last_name = json['last_name']
        email = json['email']
        contact = json['contact']


api.add_resource(CustomerSubscriptionRest, '/subscription/<customer_id>')
