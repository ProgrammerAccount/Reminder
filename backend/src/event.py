from .dbORMS.dbConn import Session, engine, Base
from .dbORMS.event import Event, EventSchema
from sqlalchemy import and_, update
from flask import Flask, jsonify, request

from .main import get_object, app, HEADER_AUTH, JWT_SECRET, JWT_ALGORITHM, get_user_idJWT


@app.route('/event/<int:id_calendar>', methods=['GET'])
def get_event(id_calendar):
    id_user = get_user_idJWT()

    if id_user:
        sess = Session()
        events = sess.query(Event).filter(Event.id_calendar == id_calendar).all()
        events = EventSchema(many=True).dump(events)
        sess.close()
        return jsonify(events), 201
    return ''


@app.route('/event', methods=['POST'])
def add_event():
    id_user = get_user_idJWT()
    if id_user:
        posted_Event = EventSchema(
            only=('title', 'date', 'time', 'color','id_calendar')).load(request.get_json())
        event = Event(**posted_Event)
        if event.time == 0:
            event.time = None
        sess = Session()

       #if sess.query(Event.date).filter(Event.date == event.date).count() != 0:
       #     event.color = sess.query(Event.date).filter(
       #         Event.date == event.date).first()
        sess.add(event)
        sess.commit()
        new_event = EventSchema().dump(event)
        sess.close()
        return jsonify(new_event), 201
    return ''


@app.route('/event', methods=['PUT'])
def update_event():
    id_user = get_user_idJWT()
    if id_user:
        posted_Event = EventSchema(
            only=('id', 'title', 'date', 'time')).load(request.get_json())
        event = Event(**posted_Event)
        if event.time == 0:
            event.time = None
        engine.connect()
        update(Event).where(and_(Event.id == Event.id, Event.id_user == id_user)).values(
            title=Event.title, date=Event.date, time=Event.time)
        return jsonify(event), 201
    return ''


@app.route('/event/<int:id>', methods=['DELETE'])
def delete_event(id):
    id_user = get_user_idJWT()
    if id_user:
        sess = Session()
        sess.query(Event).filter(
            and_(Event.id == id, Event.id_user == id_user)).delete()
        sess.commit()
        sess.close()
        return '', 201
    return ''
