from .dbORMS.dbConn import Session, engine, Base
from .dbORMS.tasks import Tasks, TasksSchema
from sqlalchemy import and_, update
from flask import Flask, jsonify, request
from .dbORMS.notification import NotificationSchema, Notification
from .main import get_object, app, HEADER_AUTH, JWT_SECRET, JWT_ALGORITHM, get_user_idJWT



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
        notyficationSchema = NotificationSchema().dump(event_notyfication)
        sess.close()

        return jsonify(notyficationSchema), 201
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

