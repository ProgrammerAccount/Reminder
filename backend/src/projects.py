from .dbORMS.dbConn import Session, engine, Base
from flask import Flask, jsonify, request
from .dbORMS.projects import Projects, ProjectsSchema
from .main import get_object, app, get_user_idJWT
from .tasks import Tasks
from sqlalchemy import and_

@app.route('/projects')
def get_projects():
    id_user = get_user_idJWT()
    if id_user:
        session = Session()
        obj = session.query(Projects).filter(Projects.id_user == id_user)
        res = ProjectsSchema(many=True).dump(obj)
        session.close()
        return jsonify(res)


@app.route('/projects', methods=['POST'])
def add_project():
    id_user = get_user_idJWT()
    if id_user:
        posted_task = ProjectsSchema(only=('title', 'id_user'))\
            .load(request.get_json())
        project = Projects(**posted_task)
        project.id_user = id_user
        session = Session()
        session.add(project)
        session.commit()
        new_project = ProjectsSchema().dump(project)
        session.close()
        return jsonify(new_project), 201


@app.route('/projects/<int:id>', methods=['DELETE'])
def remove_project(id):
    id_user = get_user_idJWT()
    if id_user:
        sess = Session()
        projectSteps = sess.query(Tasks).filter(Tasks.id_project == id).all()
        for task in projectSteps:
            task.status = 1
        sess.query(Projects).filter(
            and_(Projects.id == id, Projects.id_user == id_user)).delete()
        sess.commit()
        sess.close()
        return ''
