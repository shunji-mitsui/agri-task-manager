

import React from 'react';
import {useState,FC} from 'react';
import axios from 'axios';




export const RegistorProject:FC<{name:string,start:string,end:string}> = ({name,start,end}) => {
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
  

export const CreateProject=()=>{
  const [name,setName]=useState('')
  const [start,setStart]=useState('')
  const [end,setEnd]=useState('')
  return(
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
    </div>
  )
}





