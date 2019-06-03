from flask import Flask
from handlers import DatabaseHandler

# set up the application
app = Flask(__name__, static_url_path='/static')
app.secret_key = b'N\x8e\xd1\xed\xadHE\xe8\xcbn\xa3o|\x10j\xf9'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://digievaluation:superstrongpassword@localhost/digi'

# Set up database
DatabaseHandler.set_database(app)
DatabaseHandler.create_all()



@app.route('/')
def hello_world():
    return "Hello World"


if __name__ == '__main__':
    app.run()
