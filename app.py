from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# set up the application
app = Flask(__name__, static_url_path='/static')
app.secret_key = b'N\x8e\xd1\xed\xadHE\xe8\xcbn\xa3o|\x10j\xf9'

# set up database
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://digievaluation:superstrongpassword@localhost/digi'
db = SQLAlchemy(app)

import models
db.create_all()
db.session.commit()

@app.route('/')
def hello_world():
    return "Hello World"


if __name__ == '__main__':
    app.run()
