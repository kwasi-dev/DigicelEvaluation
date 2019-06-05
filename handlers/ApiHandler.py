from flask_restful import Api

api = None


def set_api(app):
    global api
    api = Api(app)
