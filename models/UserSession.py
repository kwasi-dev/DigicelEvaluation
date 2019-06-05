from handlers.DatabaseHandler import db


class UserSession(db.Model):
    agent_id = db.Column(db.Integer, primary_key=True)
    session_token = db.Column(db.String(100), primary_key=True)
