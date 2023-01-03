import { endianness } from 'os';
import React from 'react';
import {useState,useEffect,FC,createContext,useContext,useReducer} from 'react';
// import './App.css';
import axios from 'axios';
import {Project,Task} from '../DifinitionType'
import {ProjectHeader,DeleteProject} from './OneProjectView'
import {Calender} from '../Calender'
import dayjs from "dayjs";
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);



export const OneDayState:FC<{project:Project,day:string,
  beforeChangeDay:string,setBeforeChangeDay:React.Dispatch<React.SetStateAction<string>>,
  afterChangeDay:string,setAfterChangeDay:React.Dispatch<React.SetStateAction<string>>,
  isChangeMode:boolean,setIsChangeMode:React.Dispatch<React.SetStateAction<boolean>>}>
  =({project,day,beforeChangeDay,setBeforeChangeDay,afterChangeDay,setAfterChangeDay,isChangeMode,setIsChangeMode})=>{
  let flag=false
  let content=''


  let TaskList=[{id:'',task:''}]
  project.task.map((t)=>{
      if(t.date==day){
        TaskList.push({task:t.task,id:t.id})
      }else{
        TaskList.push({task:'-',id:''})
      }
    })



  if(dayjs(day).isBetween(project.startDate,project.endDate, null, '()')){
    flag=true
    content='○'
  }else if(day==project.startDate){
    flag=true
    content='●'
  }else if(day==project.endDate){
    flag=true
    content='●'
  }else {
    content=''
  }


  const TaskListView=TaskList.map((t)=>{
    if (!t.task){
      return(
        <div onClick={e=>{
          const newTask = window.prompt("ユーザー名を入力してください", "");
          axios.post('http://127.0.0.1:8000/task/create',{
                parentId:project.id,
                task:newTask,
                date:day,
            }).then(res=>console.log(res.data))
        }}>
          -
        </div>
      )
    }
    return(
      <div onClick={e=>{
        if(t.task!='-'){
          if (window.confirm('完了しますか')){
            axios.post('http://127.0.0.1:8000/task/delete',{id:t.id})
          }
        }else{
          const newTask = window.prompt("ユーザー名を入力してください", "");
          axios.post('http://127.0.0.1:8000/task/create',{
                parentId:project.id,
                task:newTask,
                date:day,
            }).then(res=>console.log(res.data))
        }
        }
        
      }
      
        >
        {t.task}
        </div>
        )
      })
  return(
    <div>
    <div className={flag?'Istrue':'' } 
    onClick={e=>{
        if (!isChangeMode){

          setBeforeChangeDay(day)
          setIsChangeMode(true)
        }else{
          setAfterChangeDay(day)
          
          axios.post('http://127.0.0.1:8000/project/update',{
            id:project.id,
            afterChangeDay:day
          })
          .then((res)=>{
            console.log(res.data);
          })

          setIsChangeMode(false)
        }
        
      }}
      >
      {/* {beforeChangeDay} */}
      {/* {afterChangeDay} */}
      {content}


      </div>
      
      {TaskListView}
      
    </div>
  )
}
const view=(DayList:string[],project:Project)=>{
    const list =DayList.map((d:string)=>{
        if (dayjs(d).isBetween(project.startDate,project.endDate,null,'[]' )){
            return('○')
        }
        else{
            return('×')
            }

    })
    return(list)
}



const AddTask=(project:Project,day:string)=>{
    const name=window.prompt('タスク名を入力してください')
    axios.post('',{
        parentId:project.id,
        day:day,
        task:name,
    }).then((res)=>{
        console.log(res.data)
    })
    
}
const taskView=(DayList:string[],task:Task)=>{
    const list =DayList.map((d:string)=>{
            if (task.date==d){
                return({day:d,symbol:'☆'})
            }else{
                return({day:d,symbol:'-'})
            }
        

    })
    return(list)
}

const MakeTaskField:FC<{DayList:string[],task:Task,parentId:number}>=({DayList,task,parentId})=>{
    let item=taskView(DayList,task)
    item.map((v)=>{
        return(
            <div onClick={e=>AddTask(task,v.day)}>
                {v.symbol}
            </div>
        )
    })
    return(
        <div >
            {item}
        </div>
    )

}


const RepeatFotTaskList:FC<{project:Project,DayList:string[]}>=({project,DayList})=>{
    const view=project.task.map((t)=>{
        return(
            <div>
                <MakeTaskField DayList={DayList} task={t} parentId={project.id}/>
            </div>
        )
    })
    return(
        <div>
            {view}
        </div>
    )
}

const MakeProjectField:FC<{DayList:string[],project:Project}>=({DayList,project})=>{
    let item=view(DayList,project)
    item.map((v)=>{
        return(
            <div onClick={e=>console.log('projectfield')}>
                {v}
            </div>
        )
    })
    return(
        <div >
            {item}
        </div>
    )

}


export const Gantt:FC<{project:Project,DayList:string[]}>=({project,DayList})=>{
  
const [beforeChangeDay,setBeforeChangeDay] =useState('') 
const [afterChangeDay,setAfterChangeDay] =useState('') 
const [isChangeMode,setIsChangeMode]=useState(false)
  const ViewDay=DayList.map((d)=>{
    return(
      <div className='day'>
        <OneDayState 
          project={project} 
          day={d}
          beforeChangeDay={beforeChangeDay}
          setBeforeChangeDay={setBeforeChangeDay}
          afterChangeDay={afterChangeDay}
          setAfterChangeDay={setAfterChangeDay}
          isChangeMode={isChangeMode}
          setIsChangeMode={setIsChangeMode}
          />
      </div>
    )
})
return(
    <div className='AllView'>
        <RepeatFotTaskList task={project.task} DayList={DayList} />
        <MakeProjectField DayList={DayList} project={project}/>
        {ViewDay}
    </div>
  )
}