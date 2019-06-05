from flask_sqlalchemy import SQLAlchemy

db = None


def set_database(app):
    global db
    db = SQLAlchemy(app)


def create_all():
    global db
    import models
    db.create_all()
    db.session.commit()
