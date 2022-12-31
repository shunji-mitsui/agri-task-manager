import { endianness } from 'os';
import React from 'react';
import {useState,useEffect,FC} from 'react';
import './App.css';
import axios from 'axios';
// import RcGantt, { GanttProps } from 'rc-gantt'；
import {RegistorProject} from './ProjectComponent/CreateProject'
import {DeleteProject} from './ProjectComponent/ListViewProject'
import {UpDateProject} from './ProjectComponent/ListViewProject'
// import {GetProject } from './ProjectComponent'
// import {Project} from './ProjectComponent/ListViewProject'
import {ViewComponent} from './ProjectComponent/ListViewProject'
import {CreateProject} from './ProjectComponent/CreateProject'
import {Project} from './DifinitionType'


function App() {
  return (
    <div className="App">

      <CreateProject/>  
      <ViewComponent/>
      

    </div>
  );
}

export default App;
