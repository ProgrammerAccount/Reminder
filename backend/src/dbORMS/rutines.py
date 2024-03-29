from .dbConn import Base
import datetime
from sqlalchemy import create_engine, Column, String, Integer, DateTime, Boolean, ForeignKey
from marshmallow import Schema, fields


class RutinesSchema(Schema):

    id = fields.Number()
    id_task = fields.Number()
    recurring_days = fields.Str()
    id_user = fields.Number()


class Rutines(Base):
    __tablename__ = 'rutines'
    id = Column(Integer, primary_key=True)
    id_task = Column(Integer, ForeignKey("tasks.id"))
    recurring_day = Column(String(50))
    id_user = Column(Integer, ForeignKey("user.id"))

    def __init__(self, id_task, recurring_date, id_user, id=None):
        self.id_task = id_task
        self.recurring_days = recurring_date
        self.id_user = id_user
        self.id = id
