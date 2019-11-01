from .dbORMS.calendar import CalendarSchema, Calendar
from .dbORMS.dbConn import Session, engine, Base
from flask import Flask, jsonify, request
from .main import get_object, app, HEADER_AUTH, JWT_SECRET, JWT_ALGORITHM, get_user_idJWT


@app.route('/calendar', methods=["GET"])
def get_calendar():
    id_user = get_user_idJWT()
    if id_user:
        sess = Session()
        calendars = sess.query(Calendar).filter(
            Calendar.id_user == id_user).all()
        calendars = CalendarSchema(many=True).dump(calendars)
        sess.close()
        return jsonify(calendars), 201
    return ''


@app.route('/calendar', methods=["POST"])
def add_calendar():
    id_user = get_user_idJWT()
    if id_user:
        posted_calendar = CalendarSchema(
            only=("name")).load(request.get_json())
        calendar = Calendar(**posted_calendar)
        calendar.id_user = id_user
        sess = Session()
        sess.add(calendar)
        sess.commit()
        new_calendar = CalendarSchema().dump(calendar)
        sess.close()
        return jsonify(new_calendar), 201
    return ''


@app.route('/calendar', methods=["PUT"])
def update_calendar():
    id_user = get_user_idJWT()
    if id_user:
        sess = Session()
        posted_calendar = CalendarSchema(
            only=("id", "name")).load(request.get_json())
        calendar = sess.query(Calendar).filter(
            Calendar.id == posted_calendar['id']).first()
        calendar.name = posted_calendar["name"]
        sess.commit()
        calendar_updated = CalendarSchema().dump(calendar)
        sess.close()
        return jsonify(calendar_updated), 201
    return ''


@app.route('/calendar/<int:id>', methods=["DELETE"])
def delete_calendar(id):
    id_user = get_user_idJWT()
    if id_user:
        sess = Session()
        sess.query(Calendar).filter(Calendar.id == id).delete()
        sess.commit()
        sess.close()
        return '', 201
    return ''
