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
  // const FlagList=[true,true,true,true]



  const LUP=projectList.map((p)=>{
    return(
      <div key={p.id}>
        <OneProject project={p}/>
      </div>
    )})
  // console.log('uuuuuuuuuuuuuu',CalenderFunction(projectList))
  // console.log(projectList,'プロイジェクトリストです。、')

  return(
    <div className='AllView'>
      <div>
        {LUP}
      </div>
      <Calender
      ProjectList={projectList}
      />
    </div>
  )
}

// const CalenderFunction=(projectList:Project[])=>{

//   const[DaysMatrix,setDaysMatrix]=useState<TestDayType[]>()
//   const month  =0
//   const year = dayjs().year()
//   const firstDayOfTheMonth = dayjs(new Date(2022, 1, 1)).day();
//   let currentMonthCount = 0 - firstDayOfTheMonth

  
//   for (let i =0 ;i<40 ;i++){
//     currentMonthCount++;
//     // let daysmatrix
//     const Day=String(new Date(year, month, currentMonthCount).getDate())
//     const Month=String(new Date(year, month, currentMonthCount).getMonth()+1)
//     const Year=String(new Date(year, month, currentMonthCount).getFullYear())
    
//     projectList.map((p)=>{
//       console.log('p.startDate',p.startDate)
//       console.log('カレンダーの日付',`${Year}-${Month}-${Day}`)
//       if(p.startDate==`${Year}-${Month}-${Day}`){
//         Days.push({year:Year,month:Month,day:Day,project:p.startDate})
//         // console.log({year:Year,month:Month,day:Day,project:p.startDate})
//         // return({year:Year,month:Month,day:Day,project:p.startDate})
//       }else if(p.endDate==`${Year}-${Month}-${Day}`){
//         Days.push({year:Year,month:Month,day:Day})
//         // return({year:Year,month:Month,day:Day})
//       }
//     })
//     let Days:any[]
//   }
//   setDaysMatrix(Days)

//   return(DaysMatrix)
// }



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
        <div >
  
          <div className='TaskInfo'>
            <ListUpProject projectList={viewProject}/>
          </div>
        </div>
    )
    
}