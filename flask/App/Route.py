from Controller.TaskController import TaskController
from Controller.ProjectController import ProjectController
from Controller.FieldController import FieldController
import threading as th

class Route:
    def __init__(self,app,ProjectController,TaskController):
        self.app=app
        # self.session=session
        self.ProjectController=ProjectController(self.app)
        self.TaskController=TaskController(self.app)
        self.FieldController=FieldController(self.app)