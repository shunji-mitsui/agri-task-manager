from flask import Flask
from flask import render_template, request, redirect,jsonify
from flask_sqlalchemy import SQLAlchemy
from flask import g
# from Flask-MySQLdb import MySQL
from sqlalchemy.orm import scoped_session, sessionmaker
import threading as th
import time
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from flask_cors import CORS, cross_origin
import sqlite3
import uuid
from datetime import datetime
from Controller.TaskController import TaskController
from Controller.ProjectController import ProjectController

from setting import setting



db=SQLAlchemy()
Base = declarative_base()
engine = create_engine('sqlite:///AgriTaskManager.db')
class Field(Base):
    __tablename__ = 'field'
    id=db.Column(db.Text,primary_key=True)
    field=db.Column(db.Text)
    color=db.Column(db.Text)

@app.route('/field/get',methods =['GET'])
def getField():
    Session = sessionmaker(bind=engine)
    session = Session()
    field = session.query(Field).all()
    fielddata=[
                {
                'id':f.id,
                'field':f.field,
                'color':f.color
                }
                for f in field
            ]
    session.close()
    return(fielddata)