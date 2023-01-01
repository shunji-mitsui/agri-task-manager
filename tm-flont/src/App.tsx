import React from 'react';
import './App.css';
import {ViewComponent} from './ProjectComponent/ListViewProject'
import {CreateProject} from './ProjectComponent/CreateProject'


function App() {
  return (
    <div className="App">

      <CreateProject/>  
      <ViewComponent/>
      

    </div>
  );
}

export default App;
