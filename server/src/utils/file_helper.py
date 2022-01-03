# Load Libraries and globals
import os
from flask import current_app


def delete_doc(path):
    os.remove(path)


def allowed_doc(filename):
    config = current_app.config
    if "." not in filename:
        return False
    ext = filename.rsplit(".", 1)[1]
    if ext.upper() in config["ALLOWED_DOC_EXTENSIONS"]:
        return True
    else:
        return False


def allowed_doc_filesize(filesize):
    config = current_app.config
    if int(filesize) <= config["MAX_DOC_FILESIZE"]:
        return True
    else:
        return False
