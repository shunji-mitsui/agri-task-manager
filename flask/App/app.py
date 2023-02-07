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
import datetime

from setting import setting


# db=SQLAlchemy()
app=Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:////Users/mitsuishunji/workspace/agritask/flask/var/app-instance/AgriTaskManager.db'


db=SQLAlchemy()
Base = declarative_base()

engine = create_engine('sqlite:///AgriTaskManager.db')

setting(app)

def say_th_id(secouds, th_no):
    time.sleep(secouds)


def StrForDate(stringDate):
    return datetime.datetime.strptime(stringDate,'%Y-%m-%d')

def JudgeOnTerm(start,end,targetStart,targetEnd):
    if StrForDate(start)<=StrForDate(targetStart) <=StrForDate(end):
        return(False)
    elif StrForDate(start)<=StrForDate(targetEnd) <=StrForDate(end):
        return(False)
    elif (StrForDate(targetEnd)>StrForDate(end))and(StrForDate(targetStart)<StrForDate(start)):
        return(False)
    else:
        return(True)

class Field(Base):
    __tablename__ = 'field'
    id=db.Column(db.Text,primary_key=True)
    field=db.Column(db.Text)
    color=db.Column(db.Text)
    permission=db.Column(db.Integer)
class Project(Base):
    __tablename__ = 'project'
    id=db.Column(db.Text,primary_key=True)
    name=db.Column(db.Text)
    start=db.Column(db.Text)
    end=db.Column(db.Text)
    fieldId=db.Column(db.Text)


# route = Route(app,ProjectController,TaskController)
# route.setUp()
engine = create_engine('sqlite:///AgriTaskManager.db')


Session = sessionmaker(bind=engine)
session = Session()

@app.route('/field/get',methods =['GET'])
def getField():
    field = session.query(Field).all()
    field_data=[]
    for f in field:
        project=session.query(Project).filter_by(fieldId=f.id).all()
        project_data=[]
        for p in project:
            task=session.query(ChildTask).filter_by(parentId=p.id).all()
            task_data = [
                {
                    'id': t.id,
                    'parentId': t.parentId,
                    'task':t.task,
                    'date':t.date,
                }
                for t in task
            ]
            project_data.append({
                'id': p.id,
                'field':p.fieldId,
                'name': p.name,
                'startDate':p.start,
                'endDate':p.end,
                'task':task_data
            })
        project_data.sort(key=lambda x:x['startDate'],reverse=False)
        field_data.append({
                'id':f.id,
                'field':f.field,
                'color':f.color,
                'permission':True if f.permission else False,
                'project':project_data,
        })
    return jsonify(field_data)


@app.route("/field/post", methods=['POST'])
def createField():
    request_data=request.json
    new=Field(id=str(uuid.uuid4()),field=request_data['field'],color=request_data['color'], permission=0)
    session.add(new)
    session.commit()

    return jsonify({'status':True})

@app.route("/field/update", methods=['POST'])
def updateField():
    request_data=request.json
    field = session.query(Field).filter_by(id=request_data['id']).first()
    field.field=request_data['name']

    session.commit()

    return jsonify({'status':True})

@app.route("/field/delete", methods=['POST'])
def deleteField():
    field = session.query(Field).filter_by(id=request.json['id']).first()
    project=session.query(Project).filter_by(fieldId=field.id).all()
    for p in project:
        task=session.query(ChildTask).filter_by(parentId=p.id).all()
        if task:
            for t in task:
                session.delete(t)
        session.delete(p)
    session.delete(field)
    session.commit()

    return jsonify({'status':True})





@app.route('/project/get', methods=['POST'])
def getProject():
    id=request.json['id']
    project=session.query(Project).filter_by(fieldId=request.json['id']).all()

    projectdata = [
        {
            'id': i.id,
            'field':i.fieldId,
            'name': i.name,
            'startDate':i.start,
            'endDate':i.end,
            'task':[]
        }
        for i in project
    ]
    task=session.query(ChildTask).all()
    taskdata = (
        {
            'id': t.id,
            'parentId': t.parentId,
            'task':t.task,
            'date':t.date,
        }
        for t in task
    )
    for p in projectdata:
        for t in taskdata:
            if t['parentId']==p['id']:
                p['task'].append(t)
    return jsonify(projectdata)



@app.route('/project/post', methods=['POST'])
def postProject():
    project=request.json

    field=session.query(Field).filter_by(id=project['fieldId']).first()
    if StrForDate(project['start'])>StrForDate(project['end']):
        project['start'],project['end']=project['end'],project['start']
    if not field.permission:
        queryData=[s for s in session.query(Project).filter_by(fieldId=project['fieldId']).all()]
        for q in queryData:
            if not JudgeOnTerm(q.start,q.end,project['start'],project['end']):
                return ({'status':100})

    new_project=Project(id=str(uuid.uuid4()),fieldId=project['fieldId'],name=project['item'],start=project['start'],end=project['end'])
    session.add(new_project)
    session.commit()
    return jsonify(project)

@app.route("/project/delete", methods=['POST'])
def deleteProject():
    request_data=request.json
    found_project = session.query(Project).filter_by(id=request_data['id']).first()
    task = session.query(ChildTask).filter_by(parentId=request_data['id']).all()
    for t in task:
        session.delete(t)
    session.delete(found_project)
    session.commit()
    return jsonify({'status':True})


@app.route("/project/update", methods=['POST'])
def updateProject():

    project=request.json

    found_data=session.query(Project).filter_by(id=project['id']).first()
    field=session.query(Field).filter_by(id=found_data.fieldId).first()

    if project['target']=='start':
        queryData=[s for s in session.query(Project).filter_by(fieldId=found_data.fieldId).all() if s.id != project['id']]
        if not field.permission:
            for i in queryData:
                if not JudgeOnTerm(i.start,i.end,project['afterDay'],found_data.end):
                    return ({'status':100})
        found_data.start=project['afterDay']

    elif project['target']=='end':
        queryData=[s for s in session.query(Project).filter_by(fieldId=found_data.fieldId).all() if s.id != project['id']]
        if not field.permission:
            for i in queryData:
                if not JudgeOnTerm(i.start,i.end,found_data.start,project['afterDay']):
                    return ({'status':101})
        found_data.end=project['afterDay']
    
    session.commit()

    return({'target':project['target']})


@app.route("/field/permission/change", methods=['POST'])
def change_permission():
    request_data=request.json
    field=session.query(Field).filter_by(id=request_data['fieldId']).first()
    if not request_data['permission']:
        queryData=session.query(Project).filter_by(fieldId=request_data['fieldId']).all()
        for index,value in enumerate(queryData):
            if index==len(queryData)-1:
                break
            if not JudgeOnTerm(value.start,value.end,queryData[index+1].start,queryData[index+1].end):
                return ({'status':100})

    if request_data['permission']:
        field.permission=1
    else:
        field.permission=0
    session.commit()

    return ({'status':True})



            
if __name__ == '__main__':
    app.run(port=8000,debug=True)
    
