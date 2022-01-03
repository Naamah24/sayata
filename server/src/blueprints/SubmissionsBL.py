# Load Libraries
import os
from bson import ObjectId
from flask import flash, request, url_for, send_from_directory
from werkzeug.utils import secure_filename, redirect

# Load Modules
from server.src.utils import file_helper
from server.src import config


class SubmissionsBL:

    def __init__(self):
        self.__mongoClient = config.CLIENT
        self.__db = config.DATABASE
        self.__uploadPath = config.UPLOAD_DIRECTORY

    def list_submissions(self):
        try:
            submissions = []

            # Fetch all the record(s)
            subs_cursor = self.__db.submissions.find({})
            for submission in subs_cursor:
                submissions.append(submission)
            return submissions

        except:
            # Error while trying to fetch the resource
            # Add message for debugging purpose
            return "", 500

    def list_submission_by_id(self, id):
        try:
            submission_data = self.__db.submissions.find_one({'_id': ObjectId(id)})
            return submission_data

        except:
            # Error while trying to fetch the resource
            # Add message for debugging purpose
            return "", 500

    def create_new_submission(self, obj):
        new_sub = {"companyName": obj.json["compName"],
                   "companyAddress": obj.json["address"],
                   "annualRevenue": obj.json["annualRev"],
                   "submissionStatus": obj.json["subStatus"],
                   "submissionSigned": obj.json["signed"],
                   "signedPath": obj.json["path"]}

        self.__db.submissions.insert_one(new_sub)

    def update_submission(self, id, obj):
        try:
            submission = {"companyName": obj.json["compName"],
                          "companyAddress": obj.json["address"],
                          "annualRevenue": obj.json["annualRev"],
                          "submissionStatus": obj.json["subStatus"],
                          "submissionSigned": obj.json["signed"],
                          "signedPath": obj.json["path"]}
            # check if the update request contains false value for the document before updating the record
            if submission["submissionSigned"] == "false":
                file_helper.delete_doc(submission["signedPath"])
                submission["signedPath"] = None
            new_values = {"$set": submission}
            self.__db.submissions.update_one({'_id': ObjectId(id)}, new_values)
            return "Updated", 200
        except:
            # Error while trying to fetch the resource
            # Add message for debugging purpose
            return "", 500

    def upload_doc(self, id, obj):
        submission_data = self.__db.submissions.find_one({'_id': ObjectId(id)})
        if obj.files:
            doc = obj.files["doc"]
            if doc.filename == "":
                '''return "No file part"'''
                flash('No file part')
                return redirect(request.url)
            if file_helper.allowed_doc(doc.filename):
                filename = secure_filename(doc.filename)
                filepath = os.path.join(self.__uploadPath, filename)
                doc.save(filepath)
                update_signed = {"signedPath": filepath, "submissionSigned": True}
                new_values = {"$set": update_signed}
                self.__db.submissions.update_one({'_id': ObjectId(id)}, new_values)
                return f"Document saved {filepath}"
            else:
                return "That file extension is not allowed"
        return "No files selected"

    def download_doc(self, path):
        return send_from_directory(self.__uploadPath, path, as_attachment=True)
# TODO: refactor: factory design pattern for other entities?
# TODO: Refactor: async method to upload files
# TODO: Refactor: Find out how to throw more accurate none bare except
# TODO: use or add a natural number unique id other than MongoDB -Id
# TODO: add try block to verify request body is available
# TODO: Add a filesize check for upload
