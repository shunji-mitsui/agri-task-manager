import { endianness } from 'os';
import React from 'react';
import {useState,useEffect,FC} from 'react';
import './App.css';
import axios from 'axios';
// import RcGantt, { GanttProps } from 'rc-gantt'；


interface childrenProject {
  shildrenName:string,
  startDate:string;
  endDate:string;
  content:string;
}

interface Project {
  id:string,
  name:string
  startDate:string;
  endDate:string;
  // children:childrenProject[]
}




const RegistorProject:FC<{name:string,start:string,end:string}> = ({name,start,end}) => {


  const getIp = () => {
        axios.post('http://127.0.0.1:8000/project',{
            name:name,
            start:start,
            end:end,
        })
        .then(res=>{
          console.log(res.data)
        })
  };
  return(
      <button className='login_element button' onClick={getIp}>プロジェクト登録</button>
        )
    
}

// any型になってる。後で確認。
const DeleteProject=(id:any)=>{
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


// class ChangeEditMode {
//   contentName: string;
//   contentTitle: string;
  
//   constructor(contentName:string,contentTitle:string){
//     this.contentName=contentName;
//     this.contentTitle=contentTitle;
    
//   }

//   ViewEdit(){
//     const [flag,setFlag]=useState(true);
//     if (flag){
//       return(
//         <div onClick={e=>setFlag(!flag)}>{this.contentTitle}:<input type="text"/></div>
//         )
//       }else{return(
//         <div onClick={e=>setFlag(!flag)}>{this.contentTitle}:{this.contentName}</div>
//       )}
//   }

// }


const UpDateProject = (id:string,changeTitle:string,changeContent:string) => {
  axios.post('http://127.0.0.1:8000/project/update',{
  id:id,
  changeContent:changeContent,
  changeTitle:changeTitle
}).then((res)=>console.log(res.data))
console.log('id',id)
console.log('変更タイトル',changeTitle)
console.log('変更部分',changeContent)
}

const GetProject:FC<{}> = ({}) => {
    const Nameforupdataorview:FC<{id:string,title:string,name:string,inputType:string}> = ({id,title,name,inputType}) => {
  
    const viewTitle=
    title=='name'
    ?'圃場'
    :title=='start'
    ?'開始日'
    :title=='end'
    ?'終了日'
    :'';

    const [flag,setFlag]=useState(false);
    const [changeContent,setChangeContent]=useState('');
    if (flag){
      return(
        <div >{viewTitle}:<input type={inputType} onChange={e=>setChangeContent(e.target.value)}/>
        <button onClick={e=>{
        setFlag(!flag)
        UpDateProject(id,title,changeContent)
      
      }
        }>変更</button>
        </div>
        )
      }else{return(
        <div onClick={e=>setFlag(!flag)}>{viewTitle}:{name}</div>
      )}
    }

  
  const [viewProject,setViewProject]=useState<Project[]>([{id:'',name:'',startDate:'',endDate:''}])
  useEffect(()=>{
    const fetch = async ()=>{
      const result = await axios.get('http://127.0.0.1:8000/project/get')
      setViewProject(result.data);
    }
    fetch()
  },[])

  console.log(viewProject)
  const View =viewProject.map((p)=>{
    
    
    return(
      <div key={p.id}>
        <div >
         
            <Nameforupdataorview id={p.id} title='name' name={p.name} inputType='text'/>
         
            <Nameforupdataorview id={p.id} title='start' name={p.startDate} inputType='Date'/>
        
            <Nameforupdataorview id={p.id} title='end' name={p.endDate} inputType='Date'/>
            <DeleteProject id={p.id} />
          
          _______________________
        </div>
      </div>
  )
})

return(
  <div>
    {/* <button onClick={getIp}>取得</button>  */}
    {View}
  </div>
)

}

// const ProjectInfo=()=> {
//   const [field,setField]=useState('');
//   const registor =()=>{
//     axios.post('http://127.0.0.1:8000/project/selector',{
//       field:field
//     })
//     .then(res=>{
//       console.log(res);
//     })
//   }
//   return(
//     <div>
//       圃場名の登録
//       <input type="text" onChange ={e=>setField(e.target.value)}/>
//       <button onClick={registor}>登録</button>

//     </div>
//   )

// }


function App() {
  const [name,setName]=useState('')
  const [start,setStart]=useState('')
  const [end,setEnd]=useState('')
  return (
    <div className="App">
      
        {/* <AddContent/> */}


        <div>
      圃場名<input type="text" onChange={e=>setName(e.target.value)}/> <br/>
      開始日 <input type="date" name="" id="" onChange={e=>setStart(e.target.value)}/> <br/>
      終了日 <input type="date" name="" id="" onChange={e=>setEnd(e.target.value)}/> <br/>
      {/* <ProjectInfo /> */}
      <RegistorProject
      name={name}
      start={start}
      end={end}
      />

      <GetProject/>
      
      
    </div>
        {/* <ViewContent 
        project={project}/> */}

    </div>
  );
}

export default App;
