from flask import Flask
from handlers import DatabaseHandler, ApiHandler
from flask_cors import CORS

# set up the application
app = Flask(__name__, static_url_path='/static')
app.secret_key = b'N\x8e\xd1\xed\xadHE\xe8\xcbn\xa3o|\x10j\xf9'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://digievaluation:superstrongpassword@localhost/digi'

# Enable CORS
CORS(app)

# Set up Restfullness :>
ApiHandler.set_api(app)

# Set up database
DatabaseHandler.set_database(app)
DatabaseHandler.create_all()


if __name__ == '__main__':
    app.run()
