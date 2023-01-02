

import React from 'react';
import {useState,FC} from 'react';
import axios from 'axios';




export const RegistorProject:FC<{name:string,start:string,end:string}> = ({name,start,end}) => {
    const [f,setF]=useState(true)
    const getIp = () => {
          axios.post('http://127.0.0.1:8000/project',{
              name:name,
              start:start,
              end:end,
          })
          .then(res=>{
            console.log(res.data)
            if(res.data.status==100){
              alert('その期間は予定が入っています')
            }else if(res.data.status==101){
              alert('開始日が終了日よりも後になっています。')
            }
          })
          setF(!f);
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

      圃場名<input type="text" onChange={e=>setName(e.target.value)}/>
      開始日 <input type="date" name="" id="" onChange={e=>setStart(e.target.value)}/>
      終了日 <input type="date" name="" id="" onChange={e=>setEnd(e.target.value)}/>
      {/* <ProjectInfo /> */}
      <RegistorProject
      name={name}
      start={start}
      end={end}
      />
    </div>
  )
}





