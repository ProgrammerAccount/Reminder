from .dbORMS.dbConn import Session, engine, Base
from flask import Flask, jsonify, request
from .dbORMS.timers import Timers, TimersSchema
from .main import get_object, app
from sqlalchemy import update, select


@app.route('/timers')
def get_timers():
    return get_object(Timers, TimersSchema(many=True))


@app.route('/timers', methods=['POST'])
def add_timer():
    posted_timer = TimersSchema(
        only=('name', 'id_task')).load(request.get_json())
    timer = Timers(**posted_timer)
    session = Session()
    res = session.query(Timers).filter(Timers.id_task == timer.id_task).count()
    if res == 0:
        session.add(timer)
        session.commit()
        new_timer = TimersSchema().dump(timer)
        session.close()
        return jsonify(new_timer), 201
    else:
        session.close()
        return '', 200


@app.route('/timers', methods=['PUT'])
def edit_timer():
    posted_timer = TimersSchema(
        only=('id', 'name', 'id_task')).load(request.get_json())
    timer = Timers(**posted_timer)
    conn = engine.connect()
    query = update(Timers).where(Timers.id == timer.id).values(name=timer.name)
    conn.execute(query)
    return ''


@app.route('/timers/<int:id>', methods=['DELETE'])
def remove_timer(id):
    session = Session()
    session.query(Timers).filter(Timers.id == id).delete()
    session.commit()
    session.close()
    return ''
