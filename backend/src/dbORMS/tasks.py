from .dbConn import Base
import datetime
from sqlalchemy import create_engine, Column, String, Integer, DateTime, Boolean, ForeignKey
from marshmallow import Schema, fields
from sqlalchemy.orm import relationship
from .notification import Notification, NotificationSchema
from .user import User


class TasksSchema(Schema):

    title = fields.Str()
    id_project = fields.Number()
    date = fields.DateTime()
    queue = fields.Number()
    status = fields.Bool()
    priority = fields.Number()
    id_user = fields.Number()
    id = fields.Number()


class Tasks(Base):
    __tablename__ = 'tasks'
    id = Column(Integer, primary_key=True, nullable=True)
    title = Column(String(50))
    id_project = Column(Integer,  ForeignKey("projects.id"), nullable=True)
    date = Column(DateTime, default=datetime.datetime.now())
    queue = Column(Integer)
    status = Column(Boolean)
    priority = Column(Integer)
    id_user = Column(Integer, ForeignKey('user.id'))
    subTimer = relationship("SubTimer", backref="task")
    comments = relationship("comment_to_task", backref="task")
    reminders = relationship("Notification", backref="owner")

    def __init__(self, title, id_project, date, queue, status, priority, id_user, id=None):
        self.title = title
        self.id_project = id_project
        self.date = date
        self.queue = queue
        self.status = status
        self.priority = priority
        self.id_user = id_user
        self.id = id
