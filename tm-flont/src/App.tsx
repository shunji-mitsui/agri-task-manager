import { endianness } from 'os';
import React from 'react';
import {useState,FC} from 'react';
import './App.css';
import axios from 'axios';
// import RcGantt, { GanttProps } from 'rc-gantt'；


interface childrenProject {
  shildrenName:string,
  startDate:string;
  endDate:string;
  content:string;
}

interface Project {
  id:number
  name:string
  startDate:string;
  endDate:string;
  // children:childrenProject[]
}




const projectList:Project[] =[
  {
    id:1,
    name:'圃場A'
    ,startDate:'2022-12-10'
    ,endDate:'2022-12-26'
  }
  ,
  {
    id:2,
    name:'圃場B'
    ,startDate:'2022-11-27'
    ,endDate:'2022-12-18'
  }
  
  ]

// プロジェクトの表示
const ViewContent:React.FC<{project:Project[]}>=({project})=>{
  const ViewCalender =project.map((p)=>{
    return(
      <div key={p.id}>
        <div >
          圃場 :{p.name}<br/>
          開始日 :{p.startDate}<br/>
          終了日 :{p.endDate}<br/>
          _______________________
        </div>
      </div>
  )
})
  return(
    <div>
      {ViewCalender}
    </div>
  )
}



// プロジェクトの追加
const AddContent=()=>{
  const [name,setName]=useState('')
  const [start,setStart]=useState('')
  const [end,setEnd]=useState('')
  return
  (
    <div>
      圃場名<input type="text" onChange={e=>setName(e.target.value)}/>
      開始日 <input type="text" name="" id="" onChange={e=>setStart(e.target.value)}/>
      終了日 <input type="text" name="" id="" onChange={e=>setEnd(e.target.value)}/>
      <button>登録</button>
    </div>
  )
}


function App() {
  const [project,setProject]=useState<Project[]>(projectList);
 
  return (
    <div className="App">
        {/* <AddContent/> */}
        <ViewContent 
        project={project}/>

    </div>
  );
}

export default App;
