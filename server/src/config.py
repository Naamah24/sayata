# This module is to configure app to connect with database, and to support file definitions
import os
from pymongo import MongoClient

UPLOAD_DIRECTORY = "\storage\static\docs"  # assuming this is the storage directory
if not os.path.exists(UPLOAD_DIRECTORY):
    os.makedirs(UPLOAD_DIRECTORY)
ALLOWED_DOC_EXTENSIONS = "PDF"  # File extensions allowed
MAX_DOC_FILESIZE = 1 * 1024 * 1024  # Filesize limit allowed on MongoDB (without using GridFS)
DATABASE = MongoClient()['submissionsDB']  # DB Name
DEBUG = True
CLIENT = MongoClient('localhost', 27017)

