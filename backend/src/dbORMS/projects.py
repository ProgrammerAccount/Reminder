
from .dbConn import Base
import datetime
from sqlalchemy import create_engine, Column, String, Integer, DateTime , Boolean
from sqlalchemy.orm import relationship
from marshmallow import Schema, fields

class ProjectsSchema(Schema):
   
   title = fields.Str()
   id = fields.Number()
   id_user = fields.Number()

class Projects(Base):
    __tablename__ = 'Projects'
    id = Column(Integer , primary_key = True)
    title = Column(String)	
    id_user = Column(Integer)	
    tasks = relationship("Tasks" , backref="project")
    comments = relationship("comment_to_project",backref="project")

    
    def __init__(self,title,id_user):
        self.title = title
        self.id_user = id_user



