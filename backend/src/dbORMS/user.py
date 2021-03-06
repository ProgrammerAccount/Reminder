from .dbConn import Base
import datetime
from sqlalchemy import create_engine, Column, String, Integer, DateTime, Boolean
from marshmallow import Schema, fields
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True, nullable=True)
    email = Column(String(100))
    password = Column(String(250))
    task = relationship("Tasks", backref='user')
    rutines = relationship("Rutines")
    projects = relationship("Projects")
    def __init__(self, email, password, id=None):
        self.email = email
        self.password = password
        self.id = id


class UserSchema(Schema):
    id = fields.Number()
    email = fields.Str()

    password = fields.Str()
