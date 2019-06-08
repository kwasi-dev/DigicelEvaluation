from handlers.DatabaseHandler import db
from flask_restful import Resource
from handlers.ApiHandler import api
from flask import jsonify, request


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
        subscriptions = json['subscriptions']

        old_subs = CustomerSubscription.query.filter(CustomerSubscription.customer_id == customer_id).all()
        for old_sub in old_subs:
            db.session.delete(old_sub)
        db.session.commit()
        for subs in subscriptions:
            id = subs['id']
            new_sub_item = CustomerSubscription(customer_id=customer_id, service_id=id)
            db.session.add(new_sub_item)
        db.session.commit()

        return jsonify(status=True)


api.add_resource(CustomerSubscriptionRest, '/subscription/<customer_id>')
