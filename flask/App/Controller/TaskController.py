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
import datetime
import threading as th
from Model.Model import Project,ChildTask,Field


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


class TaskController:
    def __init__(self,app):
        self.ChildTask=ChildTask
        self.Project=Project
        self.Field=Field

        self.app=app
        # Project=Project
        # ChildTask=ChildTask
        self.session=session
        # self.session.rollback()

    def createTask(self):
        # self.session.rollback()
        new_task=request.json
        new_task=self.ChildTask(id=str(uuid.uuid4()),parentId=new_task['parentId'],task=new_task['task'],date=new_task['date'])
        self.session.add(new_task)
        self.session.commit()
        # self.session.close()

        # print(new_task.parentId)
        data = {
                    'parentId': new_task.parentId,
                    'task': new_task.task,
                    'date':new_task.date,
                }
        return (data)
    

    def deleteTask(self):
        delete_task=request.json
        found_project = self.session.query(self.ChildTask).filter_by(id=delete_task['id']).first()
        self.session.delete(found_project)
        self.session.commit()
        self.session.close()

        return jsonify({'status':True})

    def StrForDate(self,stringDate):
        tdatetime = datetime.datetime.strptime(stringDate, '%Y-%m-%d')
        tdate = datetime.date(tdatetime.year, tdatetime.month, tdatetime.day)
        return tdate
    # def getTask(self):
    #     print(th.get_ident(),'1111111111111111111gettask')
    #     # requestData=request.json
    #     # self.session.rollback()
    #     task = self.session.query(self.ChildTask).all()
    #     project = self.session.query(self.Project).all()
    #     print('fddddddddddddddddd',datetime.date.today())
    #     taskData = [
    #         {
    #             'id': i.id,
    #             'parentId': i.parentId,
    #             'task':i.task,
    #             'date':i.date,
    #         }
    #         for i in task
    #     ]
    #     projectData = [
    #         {
    #             'id': i.id,
    #             'field':i.field,
    #         }
    #         for i in project
    #     ]
    #     responce_data=[
    #             {'day':'Done','contents':[]},
    #             {'day':'today','contents':[]},
    #             {'day':'this week','contents':[]},
    #             {'day':'this month','contents':[]}
    #         ]
    #     today=datetime.date.today()
    #     this_week=datetime.date.today()+datetime.timedelta(days=7)
    #     this_month=datetime.date.today()+datetime.timedelta(days=31)
    #     for d in taskData:
    #         # print(d)
    #         for p in projectData:
    #             if d['parentId']==p['id']:
    #                 print(d['task'])
    #                 print(p)
    #         #     print('-------------')
    #                 if self.StrForDate(d['date'])==today:
    #                     # print(responce_data.get('Done'))
    #                     [r['contents'].append({
    #                             'isDone':False,
    #                             'field':p['field'],
    #                             'task':d['task'],
    #                             'id':d['id'],
    #                         }) for r in responce_data if r['day']=='today']
    #                 elif self.StrForDate(d['date'])<this_week:
    #                     # print(responce_data.get('Done'))
    #                     [r['contents'].append({
    #                             'isDone':False,
    #                             'field':p['field'],
    #                             'task':d['task'],
    #                             'id':d['id'],
    #                         }) for r in responce_data if r['day']=='this week']
    #                 elif self.StrForDate(d['date'])<this_month:
    #                     # print(responce_data.get('Done'))
    #                     [r['contents'].append({
    #                             'isDone':False,
    #                             'field':p['field'],
    #                             'task':d['task'],
    #                             'id':d['id'],
    #                         }) for r in responce_data if r['day']=='this month']
    #     self.session.close()


    #     return (responce_data)

