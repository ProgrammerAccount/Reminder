from .dbORMS.dbConn import Session, engine, Base
from flask import Flask, jsonify, request
from .rutines import get_rutine
from .dbORMS.rutines import Rutines, RutinesSchema
from .dbORMS.tasks import Tasks, TasksSchema
from .dbORMS.comments import Comment, CommentSchema
from .dbORMS.comments_to_task import comment_to_task, comment_to_taskSchema
from sqlalchemy import update, select, and_
from .main import get_object, app, HEADER_AUTH, JWT_SECRET, JWT_ALGORITHM, get_user_idJWT
import jwt
import json
import time
from datetime import datetime, timedelta


@app.route('/tasks', methods=['PUT'])
def update_task():
    edited_task = TasksSchema(only=('id', 'title', 'id_project', 'date', 'queue',
                                    'status', 'priority', 'id_user')).load(request.get_json())
    task = Tasks(**edited_task)
    if task.id_project == 0:
        task.id_project = None

    conn = engine.connect()
    stmt = update(Tasks).where(Tasks.id == task.id).values(title=task.title, id_project=task.id_project, date=task.date, queue=task.queue,
                                                           status=task.status, priority=task.priority)
    conn.execute(stmt)
    return ''


@app.route('/tasks/<int:id>/<string:date_string>')
def get_tasks_by_project_and_date(id, date_string):
    session = Session()
    date = datetime.strptime(date_string, '%Y-%m-%d')
    task_objects = session.query(Tasks).filter(and_(
        Tasks.id_project == id, Tasks.date > date, Tasks.date <date + timedelta(days=1)))
    tasks = TasksSchema(many=True).dump(task_objects)
    session.close()
    return jsonify(tasks)


@app.route('/tasks/<int:id>')
def get_tasks_by_project(id):
    session = Session()
    task_objects = session.query(Tasks).filter(Tasks.id_project == id)
    tasks = TasksSchema(many=True).dump(task_objects)
    session.close()
    return jsonify(tasks)


@app.route('/tasks', methods=['GET'])
def get_tasks():

    id_user = get_user_idJWT()
    if id_user:
        sess = Session()
        response = sess.query(Tasks).filter(
            and_(Tasks.status != 1, Tasks.id_user == id_user))
        tasks = TasksSchema(many=True).dump(response)
        sess.close()
        return jsonify(tasks)


@app.route('/tasks', methods=['POST'])
def add_tasks():

    id_user = get_user_idJWT()
    if id_user:
        posted_task = TasksSchema(only=('title', 'id_project', 'date', 'queue',
                                        'status', 'priority', 'id_user')).load(request.get_json())
        task = Tasks(**posted_task)
        task.id_user = id_user
        if task.id_project == 0:
            task.id_project = None

        session = Session()
        session.add(task)
        session.commit()
        new_task = TasksSchema().dump(task)
        print(new_task)
        session.close()
        return jsonify(new_task), 201


@app.route('/tasks/<int:id_element>', methods=['DELETE'])
def remove_tasks(id_element):
    id_user = get_user_idJWT()
    if id_user:
        session = Session()
        task = session.query(Tasks).filter(
            and_(Tasks.id == id_element, Tasks.id_user == id_user)).first()
        rutines = get_rutine(id_element)
        print(rutines["recurring_days"])
        if rutines != '':
            dayArray = json.loads(rutines["recurring_days"])
            dayArray.sort()
            wd = datetime.today().weekday()
            if dayArray[-1] < wd:
                date = datetime.timestamp(datetime.today())
                date = date + ((6-wd)+dayArray[0])*86400
                date = datetime.fromtimestamp(date)
            else:
                for dayNum in dayArray:
                    if dayNum > wd:
                        date = datetime.timestamp(datetime.today())
                        date = date + ((6-wd)+dayArray[0])*86400
                        date = datetime.fromtimestamp(date)
            task.date = date

            session.commit()
            session.close()
    return ''


@app.route('/tasks/comments', methods=['POST'])
def add_comment():
    com_shema = CommentSchema(
        only=('value', 'id_user')).load(request.get_json())
    comment = Comment(**com_shema)
    session = Session()
    session.add(comment)
    session.commit()
    new_comment = TasksSchema().dump(comment)

    ctt = comment_to_task(new_comment['id'], request.get_json()['id_object'])
    session.add(ctt)
    session.commit()
    session.close()
    return jsonify('{"id":' + str(new_comment['id']) + ',"value":' + str(com_shema['value']) + ',"id_object":' + str(request.get_json()['id_object']) + ',"id_user":' + str(com_shema['id_user']) + '}'), 201


@app.route('/tasks/comments/<int:id_task>', methods=['GET'])
def get_comments(id_task):
    sess = Session()
    comments_shema = sess.query(Comment.value, Comment.id, Comment.id_user).filter(Comment.id.in_(
        sess.query(comment_to_task.id_comment).filter(comment_to_task.id_task == id_task)))
    comments = CommentSchema(many=True).dump(comments_shema)
    sess.close()
    return jsonify(comments)


@app.route('/tasks/comments', methods=['PUT'])
def edit_comment():
    id_user = get_user_idJWT()
    if id_user:
        com_shema = CommentSchema(
            only=('id', 'value', 'id_user')).load(request.get_json())
        comment = Comment(**com_shema)
        conn = engine.connect()
        stmt = update(Comment).where(
            and_(Comment.id == comment.id, Comment.id_user == id_user)).values(value=comment.value)
        conn.execute(stmt)
        return ''


@app.route('/tasks/comments/<int:id_comment>', methods=['DELETE'])
def remove_comment(id_comment):
    id_user = get_user_idJWT()
    if id_user:
        sess = Session()
        sess.query(Comment).filter(
            and_(Comment.id == id_comment, Comment.id_user == id_user)).delete()
        sess.commit()
        sess.close()
        return ''
