
import pytz
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import json
from flask_cors import CORS, cross_origin
import sqlite3


def setting(app):
    CORS(app,support_credentials=True)
    
    DATABASE_URI='sqlite:////Users/mitsuishunji/workspace/agritask/flask/var/app-instance/AgriTaskManager.db'
    engine = create_engine(DATABASE_URI, pool_pre_ping=True)
    Session = sessionmaker(bind=engine)
    session = Session()

    app.config['CORS_HEADERS'] = 'Content-Type'

    con = sqlite3.connect('AgriTaskManager.db',check_same_thread=False)
    # con.executable.invalidate()
    # con.executable.engine.dispose()

    # engine = create_engine('sqlite:////Users/mitsuishunji/workspace/agritask/flask/var/app-instance/AgriTaskManager.db')
    # Base = declarative_base()
