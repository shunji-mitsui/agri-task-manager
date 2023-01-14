from flask import Flask
from flask import render_template, request, redirect,jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import pytz
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import json
import sqlite3
import uuid
from datetime import datetime
from Model.Model import Project,ChildTask,Field
import threading as th
db=SQLAlchemy()
Base = declarative_base()

engine = create_engine('sqlite:///AgriTaskManager.db')
Session = sessionmaker(bind=engine)
session = Session()
class ChildTask(Base):
    # print(th.get_ident(),'1111111111111')
    __tablename__='childtask'
    id=db.Column(db.Text,primary_key=True)
    parentId=db.Column(db.Text)
    task=db.Column(db.Text)
    date=db.Column(db.Text)

  

class Project(Base):
    # print(th.get_ident(),'22222222222222')
    __tablename__ = 'project'
    id=db.Column(db.Text,primary_key=True)
    field=db.Column(db.Text)
    name=db.Column(db.Text)
    start=db.Column(db.Text)
    end=db.Column(db.Text)

class Field(Base):
    __tablename__ = 'field'
    id=db.Column(db.Text,primary_key=True)
    field=db.Column(db.Text)
    color=db.Column(db.Text)



class FieldController:
  def __init__(self,app):
        self.Field=Field
        self.Project=Project
        self.Task=ChildTask
        self.app=app
        self.session=session

  def getField(self):
    field = self.session.query(self.Field).all()
    fielddata=[
                {
                'id':f.id,
                'field':f.field,
                'color':f.color
                }
                for f in field
            ]
    return(fielddata)

  def deleteField(self):
    field = self.session.query(self.Field).filter_by(id=request.json['id']).first()
    project=self.session.query(self.Project).filter_by(field=field.field).all()
    for p in project:
      print(p.id)
      task=self.session.query(self.Task).filter_by(parentId=p.id).all()
      if task:
        for t in task:
          self.session.delete(t)
      self.session.delete(p)
    self.session.delete(field)
    self.session.commit()

    return jsonify({'status':True})


  def createField(self):
    request_data=request.json
    # print(request_data['color'].lstrip('#'))
    new=Field(id=str(uuid.uuid4()),field=request_data['field'],color=request_data['color'])
    print(new,'888888888888')
    self.session.add(new)
    self.session.commit()
    self.session.close()

    return jsonify({'status':True})
  def updateField(self):
    request_data=request.json
    field = self.session.query(self.Field).filter_by(id=request_data['id']).first()
    field.field=request_data['name']

    self.session.commit()
    self.session.close()

    return jsonify({'status':True})

  def getTitleField(self):
    field = self.session.query(self.Field).all()
    fielddata=[
                {
                'id':f.id,
                'field':f.field,
                'color':f.color
                }
                for f in field
            ]
    self.session.close()
    return(fielddata)

    
    
    