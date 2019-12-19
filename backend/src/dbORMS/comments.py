from .dbConn import Base
import datetime
from sqlalchemy import create_engine, Column, String, Integer, DateTime, Boolean
from marshmallow import Schema, fields


class CommentSchema(Schema):

    id = fields.Number()
    value = fields.String()
    id_user = fields.Number()


class Comment(Base):
    __tablename__ = 'Comments'
    id = Column(Integer, primary_key=True, nullable=True)
    value = Column(String(250))
    id_user = Column(Integer)

    def __init__(self, value, id_user, id=None):
        self.value = value
        self.id = id
        self.id_user = id_user
