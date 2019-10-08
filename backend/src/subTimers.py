from .dbORMS.dbConn import Session, engine, Base
from flask import Flask, jsonify, request
from .dbORMS.subTimers import SubTimer, SubTimerSchema
from .main import get_object, app
from sqlalchemy import update, select
from datetime import datetime

@app.route('/subTimers', methods=['GET'])
def get_subTimers():
    return get_object(SubTimer, SubTimerSchema(many=True))


@app.route('/subTimers/TaskTitle', methods=['GET'])
def get_subTimersWithTitle():
    session = Session()
    obj = session.query(SubTimer).all()
    toReturn = []
    for result in obj:
        obj = result
        toReturn.append({'id': obj.id, 'id_task': obj.id_task,
                         'start': obj.start, 'stop': obj.stop, 'taskTitle': obj.task.title})

    session.close()
    return jsonify(toReturn)


@app.route('/subTimers/<int:id>', methods=['GET'])
def get_RunningSubTimers(id):
    sess = Session()
    obj = sess.query(SubTimer).filter(
        SubTimer.stop == None, SubTimer.id_task == id).first()
    res = SubTimerSchema().dump(obj)
    return jsonify(res)


def stopSubTimers(currentTime):
    conn = engine.connect()
    query = update(SubTimer).where(SubTimer.stop == None).values(stop = currentTime)
    conn.execute(query)



@app.route('/subTimers', methods=['POST'])
def add_subTimers():
    posted_subTimer = SubTimerSchema(
        only=('start', 'id_task')).load(request.get_json())
    subTimer = SubTimer(**posted_subTimer)
    stopSubTimers(subTimer.start)
    sess = Session()

    sess.query()
    sess.add(subTimer)
    sess.commit()
    newSubTimer = SubTimerSchema().dump(subTimer)

    sess.close()
    return jsonify(newSubTimer), 201


@app.route('/subTimers', methods=['PUT'])
def edit_subTimers():
    posted_subTimer = SubTimerSchema(
        only=('id', 'stop', 'start')).load(request.get_json())
    subTimer = SubTimer(**posted_subTimer)
    print(subTimer.stop)
    conn = engine.connect()
    if subTimer.start != None:
        query = update(SubTimer).where(
            SubTimer.id == subTimer.id).values(stop=subTimer.stop, start=subTimer.start)
    else:
        query = update(SubTimer).where(
            SubTimer.id == subTimer.id).values(stop=subTimer.stop)
    conn.execute(query)

    return '', 201
