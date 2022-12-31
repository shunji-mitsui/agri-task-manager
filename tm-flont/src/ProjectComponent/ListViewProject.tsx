import { endianness } from 'os';
import React from 'react';
import {useState,useEffect,FC} from 'react';
// import './App.css';
import axios from 'axios';
import {Project} from '../DifinitionType'



  // any型になってる。後で確認。
export const DeleteProject=(id:any)=>{
    const deleteProject=()=>{
      axios.post('http://127.0.0.1:8000/project/delete',{
        id:id,
      }).then((res)=>console.log(res.data))
    }
    return(
      <div>
        <button onClick={deleteProject}> 削除</button>
      </div>
    )
  }


export const UpDateProject = (id:string,changeTitle:string,changeContent:string) => {
    axios.post('http://127.0.0.1:8000/project/update',{
    id:id,
    changeContent:changeContent,
    changeTitle:changeTitle
  }).then((res)=>console.log(res.data))
  console.log('id',id)
  console.log('変更タイトル',changeTitle)
  console.log('変更部分',changeContent)
  }
  


export const OneProjectView:FC<{id:string,title:string,name:string,inputType:string}> = ({id,title,name,inputType}) => {
      const viewTitle=
      title=='name'?'圃場'
      :title=='start'?'開始日'
      :title=='end'?'終了日':'エラー';
      const [flag,setFlag]=useState(false);
      const [changeContent,setChangeContent]=useState('');
      if (flag){
          return(
              <div >{viewTitle}:<input type={inputType} onChange={e=>setChangeContent(e.target.value)}/>
                  <button onClick={e=>{
                    if(changeContent ==''){
                      alert(`入力が空になっています。\n※変更後の${viewTitle}を入力してください`)
                    }else{
                      setFlag(!flag)
                      UpDateProject(id,title,changeContent)
                    }
                  }}>変更</button>
                  <button onClick={e=>{setFlag(!flag)}}>キャンセル</button>
              </div>
          )
      }else{
          return(
              <div onClick={e=>setFlag(!flag)}>{viewTitle}:{name}</div>
          )}
    }



export const ViewComponent=()=>{
    
    const [viewProject,setViewProject]=useState<Project[]>([{id:'',name:'',startDate:'',endDate:''}])
    
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/project/get')
        .then(res=>{setViewProject(res.data)
        })
    },[])

    const View =viewProject.map((p)=>{
        return(
          <div key={p.id}>
            <div >
                <OneProjectView id={p.id} title='name' name={p.name} inputType='text'/>
                <OneProjectView id={p.id} title='start' name={p.startDate} inputType='Date'/>
                <OneProjectView id={p.id} title='end' name={p.endDate} inputType='Date'/>
                <DeleteProject id={p.id} />
              _______________________
            </div>
          </div>
      )})
    return(
        <div>
            {View}
        </div>
    )
    
}