from .dbConn import Base
import datetime
from sqlalchemy import create_engine, Column, String, Integer, DateTime, Boolean, ForeignKey
from marshmallow import Schema, fields


class comment_to_projectSchema(Schema):

    id_comment = fields.Number()
    id_project = fields.Number()


class comment_to_project(Base):
    __tablename__ = 'comment_to_project'
    id_comment = Column(Integer, primary_key=True)
    id_project = Column(Integer,  ForeignKey("projects.id"), primary_key=True)


def __init__(self, id_comment, id_project):
    self.id_comment = id_comment
    self.id_project = id_project
