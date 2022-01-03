# Load Libraries
from flask import Blueprint, jsonify, request

# Load Modules
from blueprints.SubmissionsBL import SubmissionsBL

# Define the api blueprint
blueprint = Blueprint('api', __name__, url_prefix='/api')

# Add global BL instance variables
submissions_bl = SubmissionsBL()


# "Home" route to get generic API response
@blueprint.route('/')
def get_initial_response():
    """Welcome message for the API."""
    # Message to the user
    message = {
        'apiVersion': 'v1.0',
        'status': '200',
        'message': 'Welcome to the Submissions Management API'
    }
    resp = jsonify(message)
    resp.headers.add('Access-Control-Allow-Origin', '*')
    return resp


# Add views functions to the api blueprint
@blueprint.route('/submissions', methods=['GET'])
def list_submissions():
    # retrieve all submissions records
    subs = submissions_bl.list_submissions()
    return jsonify(subs)


@blueprint.route('/submissions/<string:id>', methods=['GET'])
def list_submission_by_id(id):
    # retrieve a single submission record
    submission = submissions_bl.list_submission_by_id(id)
    return jsonify(submission)


@blueprint.route('/submissions', methods=['POST'])
def create_new_submission():
    # create a new submission record
    result = submissions_bl.create_new_submission(request)
    result.headers.add('Access-Control-Allow-Origin', '*')
    return result


@blueprint.route('/submissions/<string:id>', methods=['PUT'])
def update_submission(id):
    # update a single submission record
    result = submissions_bl.update_submission(id, request)
    result.headers.add('Access-Control-Allow-Origin', '*')
    return result


@blueprint.route('files/upload/<string:id>', methods=['POST'])
def upload_doc(id):
    # upload a signed submission document
    result = submissions_bl.upload_doc(id, request)
    return result


@blueprint.route('files/download/<path:path>')
def get_doc(path):
    # download previously uploaded document
    result = submissions_bl.download_doc(path)
    return result
