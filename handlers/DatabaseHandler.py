from flask_sqlalchemy import SQLAlchemy

db = None


def set_database(app):
    global db
    db = SQLAlchemy(app)


def create_all():
    import models
    global db
    db.create_all()
    db.session.commit()
