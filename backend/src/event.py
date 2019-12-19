from .dbORMS.dbConn import Session, engine, Base
from .dbORMS.tasks import Tasks, TasksSchema
from sqlalchemy import and_, update
from flask import Flask, jsonify, request
from .dbORMS.notification import NotificationSchema, Notification
from .main import get_object, app, HEADER_AUTH, JWT_SECRET, JWT_ALGORITHM, get_user_idJWT


@app.route('/event/<int:id_project>', methods=['GET'])
def get_event(id_project):
    id_user = get_user_idJWT()

    if id_user:
        sess = Session()
        events = sess.query(Tasks).filter(
            Tasks.id_project == id_project).all()
        events = TasksSchema(many=True).dump(events)
        sess.close()
        return jsonify(events), 201
    return ''


@app.route('/event', methods=['PUT'])
def update_event():
    id_user = get_user_idJWT()
    if id_user:
        posted_Event = TasksSchema(
            only=('title', 'date', 'time', 'color', 'id_project','id'),unknown="EXCLUDE").load(request.get_json())
        print (posted_Event)

        event = Tasks(**posted_Event)
        if event.time == 0:
            event.time = None
        sess = Session()
        event_from_db = sess.query(Tasks).filter(Tasks.id == event.id).first()
        event_from_db.time=event.time
        event_from_db.date=event.date
        sess.commit()
        sess.close()

        return '', 201
    return ''

@app.route('/event', methods=['POST'])
def add_event():
    id_user = get_user_idJWT()
    if id_user:
        posted_Event = TasksSchema(
            only=('title', 'date', 'time', 'color', 'id_project')).load(request.get_json())
        event = Tasks(**posted_Event)
        if event.time == 0:
            event.time = None
        sess = Session()
        sess.add(event)
        new_event = TasksSchema().dump(event)
        sess.commit()
        sess.close()

        return jsonify(new_event), 201
    return ''

@app.route('/event/<int:id>', methods=['DELETE'])
def delete_event(id):
    id_user = get_user_idJWT()
    if id_user:
        sess = Session()
        sess.query(Tasks).filter(
            and_(Tasks.id == id, Tasks.id_user == id_user)).delete()
        sess.commit()
        sess.close()
        return '', 201
    return ''

@app.route('/event/notyfication/<int:id_event>/<int:time>', methods=['DELETE'])
def remove_eventnotyfication(id_event,time):
    id_user = get_user_idJWT()
    if id_user:
        sess = Session()
        sess.query(Notification).filter(and_(Notification.id_event == id_event,Notification.time_before_in_milisec == time)).delete()    
        sess.commit()
        sess.close()
        return '', 201
    return ''


@app.route('/event/notyfication/<int:id_event>', methods=['POST'])
def add_eventnotyfication(id_event):
    id_user = get_user_idJWT()
    if id_user:

        posted_Event_notyfication = NotificationSchema(only=('id_event', 'time_before_in_milisec')).load(request.get_json())
        event_notyfication = Notification(**posted_Event_notyfication)
        sess = Session()
        sess.add(event_notyfication)
        sess.commit()
        sess.close()

        return '', 201
    return ''


@app.route('/event/notyfication',methods=["PUT"])
def update_eventnotyfication():
    id_user = get_user_idJWT()
    if id_user:
        posted_Event_notyfication = NotificationSchema().load(request.get_json())
        print(posted_Event_notyfication)
        event_n = Notification(**posted_Event_notyfication)
        sess = Session()
        if event_n.id !=None:
            
            event_nDB = sess.query(Notification).filter(Notification.id == event_n.id).first()
            print(event_nDB)
            if event_nDB !=None:
                event_nDB.time_before_in_milisec = event_n.time_before_in_milisec
                sess.commit()
                sess.close()    
                return '',201
    return '',200    
     


@app.route('/event/notyfication/<int:id_event>', methods=['GET'])
def get_eventnotyfication(id_event):
    id_user = get_user_idJWT()
    if id_user:
        sess = Session()
        events_notyfication_query = sess.query(Notification).filter(Notification.id_event == id_event).all()    
        events_notyfication = NotificationSchema(many=True).dump(events_notyfication_query)
        sess.close()
        return jsonify(events_notyfication), 201
    return ''

