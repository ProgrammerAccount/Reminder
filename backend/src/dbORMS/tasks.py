from .dbConn import Base
import datetime
from sqlalchemy import create_engine, Column, String, Integer, DateTime, Boolean, ForeignKey
from marshmallow import Schema, fields
from sqlalchemy.orm import relationship
from .eventNotification import EventNotification, EventNotificationSchema
from .calendar import Calendar 
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
    id_calendar = Column(Integer)

class Tasks(Base):
    __tablename__ = 'Tasks'
    id = Column(Integer, primary_key=True, nullable=True)
    title = Column(String(50))
    id_project = Column(Integer,  ForeignKey("Projects.id"), nullable=True)
    date = Column(DateTime, default=datetime.datetime.now())
    queue = Column(Integer)
    status = Column(Boolean)
    priority = Column(Integer)
    id_user = Column(Integer, ForeignKey('user.id'))
    subTimer = relationship("SubTimer", backref="task")
    comments = relationship("comment_to_task", backref="task")
    id_calendar = Column(Integer,ForeignKey("Calendar.id"))
    reminders = relationship(EventNotification, backref="owner")

    def __init__(self, title, id_project, date, queue, status, priority, id_user, reminder, reminding_dateTime,id_calendar, id=None):
        self.title = title
        self.id_project = id_project
        self.date = date
        self.queue = queue
        self.status = status
        self.priority = priority
        self.id_user = id_user
        self.reminder = reminder
        self.reminding_dateTime = reminding_dateTime
        self.id_calendar = id_calendar
        self.id = id
