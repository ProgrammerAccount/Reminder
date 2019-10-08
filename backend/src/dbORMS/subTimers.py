from .dbConn import Base
from sqlalchemy import create_engine, Column, String, Integer, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from marshmallow import Schema, fields


class SubTimerSchema(Schema):
    id = fields.Number()
    start = fields.DateTime()
    stop = fields.DateTime()
    id_task = fields.Number()


class SubTimer(Base):
    __tablename__ = 'subTimers'
    id = Column(Integer, primary_key=True)
    start = Column(DateTime)
    stop = Column(DateTime)
    id_task = Column(Integer, ForeignKey('Tasks.id'))
    #task = relationship("Tasks", back_populates="subTimer")


def __init__(self, start, stop, id_task):
    self.start = start
    self.stop = stop
    self.id_task = id_task
