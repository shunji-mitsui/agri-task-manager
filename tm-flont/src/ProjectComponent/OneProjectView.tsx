import { endianness } from 'os';
import React from 'react';
import {useState,useEffect,FC,createContext,useContext,useReducer} from 'react';
// import './App.css';
import axios from 'axios';
import {Project,Task} from '../DifinitionType'


export const DeleteProject:FC<{id:string}>=({id})=>{
    const deleteProject=async()=>{
      await axios.post('http://127.0.0.1:8000/project/delete',{
        id:id,
      }).then((res)=>{
      console.log(res.data);
    })
    }

    return(
      <div>
        <button onClick={e=>{
          deleteProject()
        }
          }> プロジェクト削除</button>
      </div>
    )
  }




export const UpDateProject = (id:string,changeTitle:string,changeContent:string) => {
    axios.post('http://127.0.0.1:8000/project/update',{
    id:id,
    changeContent:changeContent,
    changeTitle:changeTitle
  }).then((res)=>
  {if (res.data.status==100){
    alert('その期間は別の予定が入っています。')
  }else if(res.data.status==101){
    alert('開始日が終了日よりも後になっています。')
  }
  console.log(res.data)})
  // console.log('id',id)
  // console.log('変更タイトル',changeTitle)
  // console.log('変更部分',changeContent)
  }
  


export const ProjectHeader:FC<{id:string,title:string,content:string}>=({id,title,content})=>{

    const [changeContent,setChangeContent]=useState('');
    const [flag,setFlag]=useState(false);
    if (flag){
      return(
          <div >エリア:<input type='text' onChange={e=>setChangeContent(e.target.value)}/>
              <button onClick={e=>{
                if(changeContent ==''){
                  alert(`入力が空になっています。\n※変更後のエリアを入力してください`)
                }else{
                  setFlag(!flag)
                  UpDateProject(id,title,changeContent)
                }
              }}>変更</button>
              <button onClick={e=>{setFlag(!flag)}}>キャンセル</button>
              <DeleteProject id={id}/>
          </div>
      )
  }else{
      return(
        <div>
          <div onClick={e=>setFlag(!flag)}>エリア:{content}</div>
          <DeleteProject id={id}/>
        </div>
      )}
  }
  