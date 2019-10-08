from .dbConn import Base
import datetime
from sqlalchemy import create_engine, Column, String, Integer, DateTime, Boolean, ForeignKey
from marshmallow import Schema, fields


class comment_to_taskSchema(Schema):

    id_comment = fields.Number()
    id_task = fields.Number()


class comment_to_task(Base):
    __tablename__ = 'comment_to_task'
    id_comment = Column(Integer, primary_key=True)
    id_task = Column(Integer, ForeignKey("Tasks.id"), primary_key=True)

    def __init__(self, id_comment, id_task):
        self.id_comment = id_comment
        self.id_task = id_task
