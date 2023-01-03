// import './App.css';
import React from 'react';
import {useState,useEffect,FC} from 'react';
import axios from 'axios';
import {Gantt} from './Gantt'
import {Project} from '../DifinitionType'
import {ProjectHeader} from './OneProjectView'
import dayjs from "dayjs";



const Header=()=>{
  const DayList=[...Array(30)].map((_, i) => dayjs().add(i, 'd').format("YYYY-MM-DD")) 
  const ViewDay=DayList.map((d)=>{
    return(
      <div>
        {/* <div className='AllView'> */}
          <div className='day'>
            <div>
            {d}
            </div>
          </div>
        {/* </div> */}
      </div>
    )
  })
  return(
    <div className='ALlView debug'>
      <div className='Navbar'>
        日付 +
      </div>
      <div>
      <div className='AllView'>
        {ViewDay}
        </div>
      </div>
    </div>
  )
}

const OneProject:FC<{project:Project}>=({project})=>{
  const DayList=[...Array(30)].map((_, i) => dayjs().add(i, 'd').format("YYYY-MM-DD")) 
  return(
    <div className='AllView'>
      <div className='Navbar'>
        <ProjectHeader id={project.id} title='name' content={project.name} />
      </div>
      <div>
        <Gantt project={project} DayList={DayList}/>
      </div>
    </div>
  )
}

const ViewProjectList:FC<{projectList:Project[]}>=({projectList})=>{

  const LUP=projectList.map((p)=>{
    return(
      <div key={p.id}>
        <OneProject project={p}/>
      </div>
    )})
  return(
    <div className='AllView'>
      <div>{LUP}</div>
    </div>
  )
}


export const ViewCalender=()=>{
  const [viewProject,setViewProject]=useState<Project[]>([{id:'',name:'',startDate:'',endDate:'',task:[{parentId:'',id:'',task:'',date:''}]}])
  const getProject=async()=>{
    // const UserCount = createContext(false);
  await axios.get('http://127.0.0.1:8000/project/get')
  .then(res=>{
    setViewProject(res.data);
  })
}
    useEffect(()=>{
      getProject();
    },[])
      return(
        <div className='TaskInfo'>
            <Header/>
            <ViewProjectList projectList={viewProject}/>
        </div>
    )
    
}