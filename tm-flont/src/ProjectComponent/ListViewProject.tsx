import { endianness } from 'os';
import React from 'react';
import {useState,useEffect,FC,createContext,useContext,useReducer} from 'react';
// import './App.css';
import axios from 'axios';
import {Project,Task} from '../DifinitionType'
import {AContentByProject,DeleteProject} from './OneProjectView'
import {SelectorTask,RegistorFormForChildTask,ViewChildTask,AddChildProject} from './ChildTask'
import {Calender} from '../Calender'
import dayjs from "dayjs";




const OneProject:FC<{project:Project}>=({project})=>{
  return(
    <div>
      <AContentByProject id={project.id} title='name' content={project.name} inputType='Text'/>
      <AContentByProject id={project.id} title='start' content={project.startDate} inputType='Date'/>
      <AContentByProject id={project.id} title='end' content={project.endDate} inputType='Date' />
      <DeleteProject id={project.id}/>
      <AddChildProject id={project.id}/>
      <ViewChildTask task={project.task}/>
    </div>
  )
}


const ListUpProject:FC<{projectList:Project[]}>=({projectList})=>{
  const LUP=projectList.map((p)=>{
    return(
      <div key={p.id}>
        <OneProject project={p}/>
      </div>
    )})
  return(
    <div>{LUP}</div>
  )
}



const CalenderFunction=()=>{


const month  =0
const year = dayjs().year()
const firstDayOfTheMonth = dayjs(new Date(2022, 1, 1)).day();
let currentMonthCount = 0 - firstDayOfTheMonth
const DaysMatrix = new Array(40).fill([]).map(() => {
    currentMonthCount++;
    const Day=String(new Date(year, month, currentMonthCount).getDate())
    const Month=String(new Date(year, month, currentMonthCount).getMonth()+1)
    const Year=String(new Date(year, month, currentMonthCount).getFullYear())


    return{year:Year,month:Month,day:Day}

    // return `${Year}年${Month}月${day}日`;

});


  return(DaysMatrix)
}



export const ViewComponent=()=>{

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
        <div className='AllView'>
          <Calender/>
          <div className='TaskInfo'>
          <ListUpProject projectList={viewProject}/>
          </div>
        </div>
    )
    
}