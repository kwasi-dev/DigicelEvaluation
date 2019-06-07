from handlers.DatabaseHandler import db


class UserSession(db.Model):
    agent_id = db.Column(db.Integer, primary_key=True)
    session_token = db.Column(db.String(100), primary_key=True)


def get_user_by_session(sess_id):
    return UserSession.query.filter(UserSession.session_token == sess_id).first()


