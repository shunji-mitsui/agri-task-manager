
import React from 'react';
import {useState,useEffect,FC,createContext,useContext,useReducer} from 'react';
// import './App.css';
import axios from 'axios';
import {Project,Task} from '../DifinitionType'



  
export const SelectorTask:FC<{taskDate:string,id:string,}> = ({taskDate,id}) =>{
    const [flag,setFlag]=useState(true);
    const [taskContent,setTaskContent]=useState('');
    const postTask=()=>{
      axios.post('http://127.0.0.1:8000/task/create',{
        parentId:id,
        task:taskContent,
        date:taskDate,
      }).then(res=>console.log(res.data))
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
          <option value="サンプル1">追肥</option>
          <option value="サンプル2">草抜き</option>
          <option value="サンプル3">マルチ貼り</option>
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


export const RegistorFormForChildTask:FC<{id:string}> = ({id}) =>{
    const [taskDate,setTaskDate]=useState('')
    return(
      <div>
        <SelectorTask taskDate={taskDate} id={id}/>
        <br/><input type="Date" onChange={e=>{setTaskDate(e.target.value)}}/>
      </div>
    )
  }
  
  
  export const AddChildProject:FC<{id:string,}> = ({id}) =>{
    const [flag,setFlag]=useState(true)
    const [vegetable,setVegetable]=useState('')
    
    if(flag){
      
      return(
        <div>
        <button onClick={e=>{setFlag(!flag);console.log(flag)}}>＋</button>
      </div>
    )
  }else{
    return(
      <div>
        <button onClick={e=>setFlag(!flag)}>ー</button><br/>
        {/* 品目<br/><input type="text" onChange={e=>setVegetable(e.target.value)}/><br/> */}
       <RegistorFormForChildTask id={id}/>
  
      </div>
    )
  }
  }
  
  export const ViewChildTask:FC<{task:Task[]}> = ({task}) =>{
    const view = task.map((t)=>{
      return(
        <div key={t.id}>
          <button onClick={e=>{axios.post('http://127.0.0.1:8000/task/delete',{id:t.id})}}>完了</button>
          仕事内容:{t.task}
          日付:{t.date}
        </div>
      )})
    return(
      <div>
        {view}
      </div>
    )
  }
  