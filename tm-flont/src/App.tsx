import React from 'react';
import './App.css';
import {ViewComponent} from './ProjectComponent/ListViewProject'
import {CreateProject} from './ProjectComponent/CreateProject'
import dayjs from "dayjs";
import {Calender} from './Calender'

function App() {
  // const month  =dayjs().month()
  
  return (
    <div className="App">
      
      <CreateProject/>  
      <ViewComponent/>
      
    </div>
  );
}

export default App;
