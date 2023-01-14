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

from Controller.TaskController import TaskController
from Controller.ProjectController import ProjectController

# from Route import Route
from setting import setting


# db=SQLAlchemy()
app=Flask(__name__)

print('---------------------------------------')
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:////Users/mitsuishunji/workspace/agritask/flask/var/app-instance/AgriTaskManager.db'

setting(app)

db=SQLAlchemy()
Base = declarative_base()

engine = create_engine('sqlite:///AgriTaskManager.db')


def say_th_id(secouds, th_no):
    time.sleep(secouds)
    print("thread no:{0}, ident:{1}".format(th_no, th.get_ident()))


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
class Project(Base):
    __tablename__ = 'project'
    id=db.Column(db.Text,primary_key=True)
    name=db.Column(db.Text)
    start=db.Column(db.Text)
    end=db.Column(db.Text)
    fieldId=db.Column(db.Text)
class ChildTask(Base):
    __tablename__='childtask'
    id=db.Column(db.Text,primary_key=True)
    parentId=db.Column(db.Text)
    task=db.Column(db.Text)
    date=db.Column(db.Text)


# route = Route(app,ProjectController,TaskController)
# route.setUp()
engine = create_engine('sqlite:///AgriTaskManager.db')

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


@app.route("/field/post", methods=['POST'])
def createField():
    Session = sessionmaker(bind=engine)
    session = Session()
    request_data=request.json
    new=Field(id=str(uuid.uuid4()),field=request_data['field'],color=request_data['color'])
    session.add(new)
    session.commit()
    session.close()

    return jsonify({'status':True})

@app.route("/field/update", methods=['POST'])
def updateField():
    Session = sessionmaker(bind=engine)
    session = Session()
    request_data=request.json
    field = session.query(Field).filter_by(id=request_data['id']).first()
    field.field=request_data['name']

    session.commit()
    session.close()

    return jsonify({'status':True})

@app.route("/field/delete", methods=['POST'])
def deleteField():
    Session = sessionmaker(bind=engine)
    session = Session()
    field = session.query(Field).filter_by(id=request.json['id']).first()
    project=session.query(Project).filter_by(fieldId=field.id).all()
    for p in project:
        print(p.id)
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
    Session = sessionmaker(bind=engine)
    session = Session()
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
    taskdata = [
        {
            'id': t.id,
            'parentId': t.parentId,
            'task':t.task,
            'date':t.date,
        }
        for t in task
    ]

    for p in projectdata:
        for t in taskdata:
            if t['parentId']==p['id']:
                p['task'].append(t)

    # for p in projectdata:
    #     print(p['id'],'888888888888')
    # session.close()
    session.close()
    return (projectdata)



@app.route('/project/post', methods=['POST'])
def postProject():
    Session = sessionmaker(bind=engine)
    session = Session()
    project=request.json


    if StrForDate(project['start'])>StrForDate(project['end']):
        project['start'],project['end']=project['end'],project['start']
    queryData=[s for s in session.query(Project).filter_by(fieldId=project['fieldId']).all()]
    for q in queryData:
        if not JudgeOnTerm(q.start,q.end,project['start'],project['end']):
            return ({'status':100})

    new_project=Project(id=str(uuid.uuid4()),fieldId=project['fieldId'],name=project['item'],start=project['start'],end=project['end'])
    session.add(new_project)
    session.commit()
    session.close()
    return jsonify(project)

@app.route("/project/delete", methods=['POST'])
def deleteProject():
    Session = sessionmaker(bind=engine)
    session = Session()
    request_data=request.json
    found_project = session.query(Project).filter_by(id=request_data['id']).first()
    task = session.query(ChildTask).filter_by(parentId=request_data['id']).all()
    for t in task:
        session.delete(t)
    session.delete(found_project)
    session.commit()
    session.close()
    return jsonify({'status':True})


@app.route('/task/get', methods=['POST'])
def getTask():
    Session = sessionmaker(bind=engine)
    session = Session()
    print(request.json,'----------------------')
    task=session.query(ChildTask).filter_by(parentId=request.json['id']).all()
    # print(task)
    taskdata = [
        {
            'id': t.id,
            'parentId': t.parentId,
            'task':t.task,
            'date':t.date,
        }
        for t in task
    ]

    session.close()
    return(taskdata)
    # return({'status':True})

@app.route('/board/get', methods=['GET'])
def getTaskForBoard():
    today=datetime.date.today()
    this_week=datetime.datetime.today()+datetime.timedelta(days=7)
    next_week=datetime.datetime.today()+datetime.timedelta(days=14)
    this_month=datetime.datetime.today()+datetime.timedelta(days=31)
    Session = sessionmaker(bind=engine)
    session = Session()
    task=session.query(ChildTask).all()
    taskdata={'this week':[],'next week':[],'this month':[]}
    datestatus='this week'
    for t in task:
        project=session.query(Project).filter_by(id=t.parentId).first()
        field=session.query(Field).filter_by(id=project.fieldId).first()
        if StrForDate(t.date)<this_week:
            datestatus='this week'
        elif StrForDate(t.date)<next_week:
            datestatus='next week'
        elif StrForDate(t.date)<this_month:
            datestatus='this month'
        data={
                'id': t.id,
                'parentProject': project.name,
                'task':t.task,
                'date':t.date,
                'color':field.color,
            }
        taskdata[datestatus].append(data)
    taskList=[]
    for key in taskdata:
        data={
            'status':key,
            'task':taskdata[key]
        }
        taskList.append(data)
    

    session.close()
    return(taskList)
    # return({'status':True})

@app.route("/project/update", methods=['POST'])
def updateProject():
    Session = sessionmaker(bind=engine)
    session = Session()

    project=request.json

    if project['target']=='start':
        found_data=session.query(Project).filter_by(id=project['id']).first()
        queryData=[s for s in session.query(Project).filter_by(fieldId=found_data.fieldId).all() if s.id != project['id']]
        for i in queryData:
            print(JudgeOnTerm(i.start,i.end,found_data.start,project['afterDay']))
            if not JudgeOnTerm(i.start,i.end,project['afterDay'],found_data.end):
                return ({'status':100})
        found_data.start=project['afterDay']

    elif project['target']=='end':
        found_data=session.query(Project).filter_by(id=project['id']).first()
        queryData=[s for s in session.query(Project).filter_by(fieldId=found_data.fieldId).all() if s.id != project['id']]
        for i in queryData:
            print(JudgeOnTerm(i.start,i.end,found_data.start,project['afterDay']))
            if not JudgeOnTerm(i.start,i.end,found_data.start,project['afterDay']):
                return ({'status':101})
        found_data.end=project['afterDay']
    
    session.commit()
    session.close()

    return({'target':project['target']})
    













@app.route("/task/delete", methods=['POST'])
def deleteTask():
    Session = sessionmaker(bind=engine)
    session = Session()
    delete_task=request.json
    found_project = session.query(ChildTask).filter_by(id=delete_task['id']).first()
    session.delete(found_project)
    session.commit()
    session.close()





@app.route("/task/create", methods=['POST'])
def createTask():
    Session = sessionmaker(bind=engine)
    session = Session()
    new_task=request.json
    print(new_task)
    new_task=ChildTask(id=str(uuid.uuid4()),parentId=new_task['parentId'],task=new_task['task'],date=new_task['date'])
    session.add(new_task)
    session.commit()
    session.close()

    return ({'status':True})





            
if __name__ == '__main__':
    app.run(port=8000,debug=True)
    