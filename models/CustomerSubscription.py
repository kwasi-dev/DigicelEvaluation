from app import db


class CustomerSubscription(db.Model):
    customer_id = db.Column(db.Integer, primary_key=True)
    service_id = db.Column(db.Integer, primary_key=True)