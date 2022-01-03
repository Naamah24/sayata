# Load libraries
import json

from bson import ObjectId
from flask import Flask
from flask_cors import CORS


# Load Modules
from api import blueprint as api_blueprint

# initialize Flask app and register blueprints
app = application = Flask(__name__)
CORS(app)
app.register_blueprint(api_blueprint)

# Use config.py for app configuration
app.config.from_pyfile('config.py')


# TODO: create a secondary key
# define MyEncoder serialization class to convert MongoDB _id Field from
# ObjectID to string
class MyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        return super(MyEncoder, self).default(obj)


app.json_encoder = MyEncoder

if __name__ == "__main__":
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
