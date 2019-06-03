from handlers.DatabaseHandler import db


class ServiceRecord(db.Model):
    service_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True)
    price = db.Column(db.Numeric(10, 2))
