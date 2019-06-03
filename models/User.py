from handlers.DatabaseHandler import db


class User(db.Model):
    agent_id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), unique=True)
    username = db.Column(db.String(20), unique=True)
    password = db.Column(db.String(80), unique=True)
