from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql.schema import Column
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from flask_cors import CORS, cross_origin
import sqlite3
from flask import Flask
from flask import render_template, request, redirect,jsonify
from flask_sqlalchemy import SQLAlchemy
from flask import g



db=SQLAlchemy()
Base = declarative_base()

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
