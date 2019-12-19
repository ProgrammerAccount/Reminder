from .dbConn import Base
import datetime
from sqlalchemy import create_engine, Column, String, Integer, DateTime, Date, Time, Boolean, ForeignKey, Integer
from marshmallow import Schema, fields
from sqlalchemy.orm import relationship

class NotificationSchema(Schema):
    id = fields.Number()
    id_event = fields.Number()
    time_before_in_milisec = fields.Integer()


class Notification(Base):
    __tablename__ = 'notification'
    id = Column(Integer, primary_key=True, nullable=True)
    id_event = Column(Integer, ForeignKey("tasks.id"))
    time_before_in_milisec = Column(Integer)
    
    def __init__(self, id_event, time_before_in_milisec, id=None):
        self.id = id
        self.id_event = id_event
        self.time_before_in_milisec = time_before_in_milisec
