
import React from 'react';
import {useState,useEffect,FC,createContext,useContext,useReducer} from 'react';
// import './App.css';
import axios from 'axios';
import {Project,Task} from '../DifinitionType'
import dayjs from "dayjs";
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);


  
export const SelectorTask:FC<{taskDate:string,project:Project,}> = ({taskDate,project}) =>{
    const [flag,setFlag]=useState(true);
    const [taskContent,setTaskContent]=useState('');
    const postTask=()=>{
    if (dayjs(taskDate).isBetween(project.startDate,project.endDate, null, '[]')){

            axios.post('http://127.0.0.1:8000/task/create',{
                parentId:project.id,
                task:taskContent,
                date:taskDate,
            }).then(res=>console.log(res.data))
        }else{
            alert('タスクがプロジェクトの期間内に入っていません')
        }
    }
    if(flag){
      return(
        <div>
        <select name="example" onChange={
          e=>{
            if(e.target.value=='other'){
              setFlag(!flag);
            }else{
              setTaskContent(e.target.value)
            }
          }
        }>
          <option value="追肥">追肥</option>
          <option value="草抜き">草抜き</option>
          <option value="マルチ">マルチ貼り</option>
          <option value="other">手動入力</option>
        </select>
        <button onClick={postTask}>決定</button>
      </div>
    )
  }else {
    return(
      <div>
      タスクを入力
      <input type="text" onChange={e=>setTaskContent(e.target.value)}/>
      <button onClick={postTask}>決定</button>
    </div>
  )}
  
}


export const RegistorFormForChildTask:FC<{project:Project}> = ({project}) =>{
    const [taskDate,setTaskDate]=useState('')
    return(
      <div>
        <SelectorTask taskDate={taskDate} project={project}/>
        <br/><input type="Date" onChange={e=>{setTaskDate(e.target.value)}}/>
      </div>
    )
  }
  
  