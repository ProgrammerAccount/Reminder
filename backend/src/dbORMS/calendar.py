from .dbConn import Base
from sqlalchemy import create_engine, Column, String, Integer
from marshmallow import Schema, fields


class CalendarSchema(Schema):
    id = fields.Number()
    name = fields.String()
    id_user = fields.Number()


class Calendar(Base):
    __tablename__ = 'Calendar'
    id = Column(Integer, primary_key=True, nullable=True)
    name = Column(String)
    id_user = Column(Integer)

    def _init_(self, name, id_user, id=None):
        self.name = name
        self.id = id
        self.id_user = id_user
