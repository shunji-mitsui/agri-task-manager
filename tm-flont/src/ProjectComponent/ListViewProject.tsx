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


export const ViewChildTask:FC<{id:string,}> = ({id}) =>{
  const [childtask,setChildTask]=useState([{id:'',parentId:'',task:'',date:''}]);
  useEffect(()=>{
    axios.post(`http://127.0.0.1:8000/task/get`,{
      id:id
    })
    .then(res=>{
      console.log('huhuhuhuhuh',res.data);
      setChildTask(res.data);
    });
  },[])
  // const ViewChildTask=childtask.map((p)=>{
  //   return(
  //     <div id ={p.id}>
  //       {p.parentId}
  //       {p.task}
  //       {p.date}
  //     </div>
  //   )
  // })
  return(
    <div>
      childtaskのviewコンポーンネントです。
    </div>
  )
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
                <AddChildProject id={p.id}/>
                <ViewChildTask id={p.id}/>
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