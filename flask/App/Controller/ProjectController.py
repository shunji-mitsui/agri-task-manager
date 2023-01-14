from flask import Flask
from flask import render_template, request, redirect,jsonify
from flask_sqlalchemy import SQLAlchemy
# from datetime import datetime
import pytz
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import json
import sqlite3
import uuid
import datetime
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
    fieldId=db.Column(db.Text)
    name=db.Column(db.Text)
    start=db.Column(db.Text)
    end=db.Column(db.Text)

class Field(Base):
    __tablename__ = 'field'
    id=db.Column(db.Text,primary_key=True)
    field=db.Column(db.Text)
    color=db.Column(db.Text)

class ProjectController:
    def __init__(self,app):
        self.ChildTask=ChildTask
        self.Project=Project
        self.Field=Field
        self.app=app
        # Project=Project
        self.session=session
        print(th.get_ident(),'44444444444444444')

    
    def StrForDate(self,stringDate):
        return datetime.strptime(stringDate,'%Y-%m-%d')

    def JudgeOnTerm(self,start,end,targetStart,targetEnd):
        if self.StrForDate(start)<=self.StrForDate(targetStart) <=self.StrForDate(end):
            return(False)
        elif self.StrForDate(start)<=self.StrForDate(targetEnd) <=self.StrForDate(end):
            return(False)
        elif (self.StrForDate(targetEnd)>self.StrForDate(end))and(self.StrForDate(targetStart)<self.StrForDate(start)):
            return(False)
        else:
            return(True)


    def updateProject(self):
        project=request.json

        if project['target']=='name':
            found_data=self.session.query(self.Project).filter_by(id=project['id']).first()
            found_data.name=project['value']

        elif project['target']=='start':
            found_data=self.session.query(self.Project).filter_by(id=project['id']).first()
            queryData=[s for s in self.session.query(self.Project).filter_by(field=found_data.field).all() if s.id != project['id']]
            for i in queryData:
                print(self.JudgeOnTerm(i.start,i.end,found_data.start,project['afterDay']))
                if not self.JudgeOnTerm(i.start,i.end,project['afterDay'],found_data.end):
                    return ({'status':100})
            found_data.start=project['afterDay']

        elif project['target']=='end':
            found_data=self.session.query(self.Project).filter_by(id=project['id']).first()
            queryData=[s for s in self.session.query(self.Project).filter_by(field=found_data.field).all() if s.id != project['id']]
            for i in queryData:
                print(self.JudgeOnTerm(i.start,i.end,found_data.start,project['afterDay']))
                if not self.JudgeOnTerm(i.start,i.end,found_data.start,project['afterDay']):
                    return ({'status':101})
            found_data.end=project['afterDay']
        
        self.session.commit()
        self.session.close()

        return({'target':project['target']})
        

    def deleteProject(self):
        try:
            request_data=request.json
            found_project = self.session.query(self.Project).filter_by(id=request_data['id']).first()
            task = self.session.query(self.ChildTask).filter_by(parentId=request_data['id']).all()
            for t in task:
                self.session.delete(t)
            self.session.delete(found_project)
            self.session.commit()
            self.session.close()

            return jsonify({'status':True})
        except:
            print('iiiiiiiiiiiiiiii deleteprojectでエラー')
            return jsonify({'status':True})


    def postProject(self):
        project=request.json
        print('dddd',self.StrForDate(project['start']))
        print('eeeeeeeeee',self.StrForDate(project['end']))
        print('ettttttttttt',self.StrForDate(project['start'])>self.StrForDate(project['end']))
        try:
            # print(self.StrForDate(project['start']))
            # print(self.StrForDate(project['end']))

            if self.StrForDate(project['start'])>self.StrForDate(project['end']):
                print('OOOOOOOOOOOOOO')
                project['start'],project['end']=project['end'],project['start']
                print(project['start'],'888888888888')
                print(project['end'],'888888888888')

            queryData=[s for s in self.session.query(self.Project).filter_by(field=project['field']).all()]
            for q in queryData:
                print(self.JudgeOnTerm(q.start,q.end,project['start'],project['end']))
                if not self.JudgeOnTerm(q.start,q.end,project['start'],project['end']):
                    return ({'status':100})
            # ExistingData=self.session.query(self.Project).filter_by(name=project['name']).all()
            # print(th.get_ident(),'1111111111111111111postproject')
            # if datetime.strptime(project['start'],'%Y-%m-%d')>datetime.strptime(project['end'],'%Y-%m-%d'):
            #     return({'status':101})
            # for i in ExistingData:
            #     if self.StForDt(i.start)<= datetime.strptime(project['start'],'%Y-%m-%d') <=datetime.strptime(i.end,'%Y-%m-%d'):
            #         return({'status':100})
            #     elif self.StForDt(i.start)<= datetime.strptime(project['end'],'%Y-%m-%d') <=datetime.strptime(i.end,'%Y-%m-%d'):
            #         return({'status':100})
            #     elif (datetime.strptime(project['start'],'%Y-%m-%d')<self.StForDt(i.start))and(datetime.strptime(project['end'],'%Y-%m-%d')>datetime.strptime(i.end,'%Y-%m-%d')):
            #         return({'status':100})
            if self.session.query(self.Field).filter_by(field=project['field']).first() is None:
                new_field=self.Field(id=str(uuid.uuid4()),field=project['field'])
                self.session.add(new_field)

            new_project=Project(id=str(uuid.uuid4()),field=project['field'],name=project['item'],start=project['start'],end=project['end'])
            self.session.add(new_project)
            self.session.commit()
            self.session.close()
            return jsonify(project)
        except:
            import traceback
            traceback.print_exc()
            print('iiiiiiiiiiiiiiii postProjectでエラースレッド→',th.get_ident())
            return jsonify({'status':True})

    def getProject(self):
        try:
            Session = sessionmaker(bind=engine)
            session = Session()
            id=request.json['id']
            print('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
            project=session.query(self.Project).filter_by(fieldId=id).all()
            print(project)
            
            projectdata = [
                {
                    'id': i.id,
                    'field':i.fieldId,
                    'name': i.name,
                    'startDate':i.start,
                    'endDate':i.end,
                    'task':[],
                }
                for i in project
            ]
            # for p in projectdata:
            #     task = session.query(self.ChildTask).filter_by(parentId=p.id).all()
            #     p['task'].append(task)
            

            # self.session.close()
            session.close()
            print(projectdata)
            

            return (projectdata)
            # return ({'status':True})
        except:
            print('iiiiiiiiiiiiiiii getProjectでエラースレッド→',th.get_ident())
            import traceback
            traceback.print_exc()
            return jsonify({'status':False})
