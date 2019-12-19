from .dbORMS.dbConn import Session, engine, Base
from flask import Flask, jsonify, request
from flask_cors import CORS
from .dbORMS.projects import Projects, ProjectsSchema
from .dbORMS.rutines import Rutines, RutinesSchema
from sqlalchemy import update, select
from .dbORMS.tasks import Tasks, TasksSchema
from .dbORMS.subTimers import SubTimer, SubTimerSchema
from .dbORMS.comments import Comment, CommentSchema
from .dbORMS.comments_to_project import comment_to_project, comment_to_projectSchema
from .dbORMS.comments_to_task import comment_to_task, comment_to_taskSchema
from .dbORMS.notification import NotificationSchema, Notification
import jwt
app = Flask(__name__)
app.config['SQLALCHEMY_ECHO'] = True

CORS(app)
Base.metadata.create_all(engine)
HEADER_AUTH = 'Authorization'
JWT_SECRET = 'asdsa4bq12r'
JWT_ALGORITHM = 'HS256'


def get_object(ORMdb, schema):
    session = Session()
    obj = session.query(ORMdb).all()
    res = schema.dump(obj)
    session.close()
    return jsonify(res)


def get_user_idJWT():
    jwt_token = request.headers.get(HEADER_AUTH, None)
    if jwt_token:
        payload = jwt.decode(jwt_token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload['id']:
            return payload['id']
    return False


from .user import *
from .projects import *
from .rutines import *
from .subTimers import *
from .tasks import *

