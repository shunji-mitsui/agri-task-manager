import { endianness } from 'os';
import React from 'react';
import {useState,FC} from 'react';
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
  id:number
  name:string
  startDate:string;
  endDate:string;
  // children:childrenProject[]
}




const projectList:Project[] =[
  {
    id:1,
    name:'圃場A'
    ,startDate:'2022-12-10'
    ,endDate:'2022-12-26'
  }
  ,
  {
    id:2,
    name:'圃場B'
    ,startDate:'2022-11-27'
    ,endDate:'2022-12-18'
  }
  
  ]

// プロジェクトの表示
const ViewContent:React.FC<{project:Project[]}>=({project})=>{
  const ViewCalender =project.map((p)=>{
    return(
      <div key={p.id}>
        <div >
          圃場 :{p.name}<br/>
          開始日 :{p.startDate}<br/>
          終了日 :{p.endDate}<br/>
          _______________________
        </div>
      </div>
  )
})
  return(
    <div>
      {ViewCalender}
    </div>
  )
}


const RegistorProject:FC<{name:string,start:string,end:string}> = ({name,start,end}) => {


  const getIp = () => {  
        axios.post('http://127.0.0.1:8000/project',{
            name:name,
            start:start,
            end:end,
        })
        .then(res=>{
            if(res.data.status){
                // window.location.href='/hero.com/main'
                console.log(res.data.status)
            }else{
              console.log('ng')
            }
        })
  };
  return(
      <button className='login_element button' onClick={getIp}>プロジェクト登録</button>
        )
        
      //   {
      //   console.log('name',name);
      //   console.log('start',start);
      //   console.log('end',end);
      
      // }
      
    
}

const GetProject:FC<{}> = ({}) => {
  
  const getIp = () => {  
    axios.get('http://127.0.0.1:8000/project/get')
    .then(res=>{
            console.log(res.data)
    })
};

return(
  <div>
    <button onClick={getIp}>取得</button>
  </div>
)

}


function App() {
  const [project,setProject]=useState<Project[]>(projectList);
  const [name,setName]=useState('')
  const [start,setStart]=useState('')
  const [end,setEnd]=useState('')
  return (
    <div className="App">
      
        {/* <AddContent/> */}


        <div>
      圃場名<input type="text" onChange={e=>setName(e.target.value)}/> <br/>
      開始日 <input type="text" name="" id="" onChange={e=>setStart(e.target.value)}/> <br/>
      終了日 <input type="text" name="" id="" onChange={e=>setEnd(e.target.value)}/> <br/>


      <RegistorProject
      name={name}
      start={start}
      end={end}
      />

      <GetProject/>
      
      ーーーーーーーーー
    </div>

        <ViewContent 
        project={project}/>

    </div>
  );
}

export default App;
