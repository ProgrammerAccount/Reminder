from .dbORMS.dbConn import Session, engine, Base
from flask import Flask, jsonify, request
from .dbORMS.rutines import Rutines, RutinesSchema
from .main import get_object, app , get_user_idJWT

from sqlalchemy import update, select, and_
@app.route('/rutines/<int:id_task>', methods=['GET'])
def get_rutine(id_taks):
    sess = Session()
    if sess.query(Rutines).filter(Rutines.id_task == id_taks).count()==1:
        rutinesQuery = sess.query(Rutines).filter(Rutines.id_task == id_taks).first()       
        return RutinesSchema().dump(rutinesQuery)
    return ''


@app.route('/rutines', methods=['POST'])
def add_rutines():
    id_user = get_user_idJWT()
    if id_user:
        posted_rutine = RutinesSchema(only=("id_task","recurring_days","id_user")).load(request.get_json())
        rutine = Rutines(**posted_rutine)
        sess= Session()
        sess.add(rutine)
        sess.commit()
        new_rutine = RutinesSchema().dump(rutine)
        sess.close()
        return jsonify(new_rutine), 201
    else:
        return ''


@app.route('/rutines',methods=['GET'])
def get_rutines():
    id_user = get_user_idJWT()
    if id_user:
        sess = Session()
        response = sess.query(Rutines).filter(Rutines.id_user == id_user)
        rutines = RutinesSchema(many=True).dump(response)
        sess.close()
        return jsonify(rutines)
    else:
        return ''
    
    
@app.route('/rutines/<int:id>',methods=['DELETE'])
def delete_rutines(id):
    id_user = get_user_idJWT()
    if id_user:
        sess = Session()
        sess.query(Rutines).filter(and_(Rutines.id_user == id_user,Rutines.id == id)).delete()
        sess.commit()
        

@app.route('/rutines', methods=['PUT'])
def edit_rutines():
    id_user = get_user_idJWT()
    if id_user:
        posted_rutine = RutinesSchema(only=('id','id_task','recurring_day','id_user'))
        rutines = Rutines(**posted_rutine)
        conn = engine.connect()
        stmt = update(Rutines).where(and_(Rutines.id==rutines.id,Rutines.id_user == rutines.id_user)).values(id_task=rutines.id_task,recurring_day= rutines.recurring_days)
        conn.execute(stmt)
        return '' 
        
        


    
    