from app import db


class CustomerRecord(db.Model):
    customer_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), unique=True)
    last_name = db.Column(db.String(80), unique=True)
    email = db.Column(db.String(80), unique=True)
    contact = db.Column(db.String(80), unique=True)
