from datetime import datetime
from sqlalchemy import create_engine, Column, String, Integer, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
db_user = 'phpmyadmin'
db_pass = 'root'
db_name = 'Reminder'
db_url='127.0.0.1'
db_port="3600"
engine = create_engine('mysql+mysqlconnector://'+db_user+':'+db_pass+'@'+db_url+'/'+db_name, pool_size=50, max_overflow=50)
Session = sessionmaker(bind=engine)
Base = declarative_base()


