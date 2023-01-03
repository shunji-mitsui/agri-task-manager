import { endianness } from 'os';
import React from 'react';
import {useState,useEffect,FC,createContext,useContext,useReducer} from 'react';
// import './App.css';
import axios from 'axios';
import {Project,Task} from '../DifinitionType'
import {AContentByProject,DeleteProject} from './OneProjectView'
import {Calender} from '../Calender'
import dayjs from "dayjs";
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

const OneDayState:FC<{project:Project,day:string,
  beforeChangeDay:string,setBeforeChangeDay:React.Dispatch<React.SetStateAction<string>>,
  afterChangeDay:string,setAfterChangeDay:React.Dispatch<React.SetStateAction<string>>,
  isChangeMode:boolean,setIsChangeMode:React.Dispatch<React.SetStateAction<boolean>>}>=(props)=>{
  let flag=false
  let content=''
  let TaskList=[{id:'',task:''}]
  props.project.task.map((t)=>{
      if(t.date==props.day){
        TaskList.push({task:t.task,id:t.id})
      }else{
        TaskList.push({task:'-',id:''})
      }
    })



  if(dayjs(props.day).isBetween(props.project.startDate,props.project.endDate, null, '()')){
    flag=true
    content='○'
  }else if(props.day==props.project.startDate){
    flag=true
    content='●'
  }else if(props.day==props.project.endDate){
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
                parentId:props.project.id,
                task:newTask,
                date:props.day,
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

          console.log('iiiiiiiiijijjj',t.id)
          const newTask = window.prompt("ユーザー名を入力してください", "");
          axios.post('http://127.0.0.1:8000/task/create',{
                parentId:props.project.id,
                task:newTask,
                date:props.day,
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
        if (!props.isChangeMode){

          props.setBeforeChangeDay(props.day)
          props.setIsChangeMode(true)
        }else{
          props.setAfterChangeDay(props.day)
          
          axios.post('http://127.0.0.1:8000/project/update',{
            id:props.project.id,
            afterChangeDay:props.day
          })
          .then((res)=>{
            console.log(res.data);
          })

          props.setIsChangeMode(false)
        }
        
      }}
      >
      {/* {beforeChangeDay} */}
      {/* {props.afterChangeDay} */}
      {content}


      </div>
      <div>
      {TaskListView}
      </div>
    </div>
  )
}

const Gantt:FC<{project:Project,DayList:string[]}>=(props)=>{
  
const [beforeChangeDay,setBeforeChangeDay] =useState('') 
const [afterChangeDay,setAfterChangeDay] =useState('') 
const [isChangeMode,setIsChangeMode]=useState(false)
  const ViewDay=props.DayList.map((d)=>{
    let flag=false
    return(
      <div className='day'>
        <OneDayState 
        project={props.project} 
        day={d}
        beforeChangeDay={beforeChangeDay}
        setBeforeChangeDay={setBeforeChangeDay}
        afterChangeDay={afterChangeDay}
        setAfterChangeDay={setAfterChangeDay}
        isChangeMode={isChangeMode}
        setIsChangeMode={setIsChangeMode}
        
        />
        {/* {d} */}
      </div>
    )
  })
  return(
    <div className='AllView'>
      {ViewDay}
    </div>
  )
}


const OneProject:FC<{project:Project}>=({project})=>{

  const DayList=[...Array(50)].map((_, i) => dayjs().add(i, 'd').format("YYYY-MM-DD")) 

  return(
    <div className='AllView'>
      <div className='Navbar'>
        <AContentByProject id={project.id} title='name' content={project.name} inputType='Text'/>
        <DeleteProject id={project.id}/>

      </div>
      <Gantt project={project} DayList={DayList}/>
    </div>
  )
}

const Header=()=>{
  const DayList=[...Array(50)].map((_, i) => dayjs().add(i, 'd').format("YYYY-MM-DD")) 
  const ViewDay=DayList.map((d)=>{
    return(
      <div className='day'>
        {d}
      </div>
    )
  })
  return(
    <div className='AllView'>
      <div className='Navbar'>
        日付
      </div>
        {ViewDay}
    </div>
  )
}

const ListUpProject:FC<{projectList:Project[]}>=({projectList})=>{
  // const FlagList=[true,true,true,true]
  const header:Project = {id:'header',name:'header',startDate:'header',endDate:'header',task:[{parentId:'header',id:'header',task:'header',date:'header'}]}
  projectList.unshift(header)

  const LUP=projectList.map((p)=>{
    if (p.id=='header'){
      return(
        <div>
          <Header/>
        </div>

      )
    }
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

    </div>
  )
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
        <div >
  
          <div className='TaskInfo'>
            <ListUpProject projectList={viewProject}/>
          </div>
        </div>
    )
    
}