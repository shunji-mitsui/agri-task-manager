import React from 'react';
import './App.css';
import {ViewCalender} from './ProjectComponent/ViewProject'
import {CreateProject} from './ProjectComponent/CreateProject'
import dayjs from "dayjs";


function App() {
  // const month  =dayjs().month()
  
  return (
    <div className="App">
      
      <CreateProject/>  
      <ViewCalender/>
      
    </div>
  );
}

export default App;
