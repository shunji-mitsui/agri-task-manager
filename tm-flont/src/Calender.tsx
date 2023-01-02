import React,{FC,useState} from 'react';
import { Router } from 'react-router-dom';
import './App.css';
import dayjs from "dayjs";

export interface TypeOfDate {
    year:string,
    month:string,
    day:string,
}
export const Calender=()=>{


    const month  =0
  const year = dayjs().year()
  const firstDayOfTheMonth = dayjs(new Date(2022, 1, 1)).day();
  console.log('firstDayOfTheMonth',firstDayOfTheMonth)
  let currentMonthCount = 0 - firstDayOfTheMonth
  console.log('currentMonthCount',currentMonthCount)
  const DaysMatrix = new Array(33).fill([]).map(() => {
      currentMonthCount++;
      const Day=String(new Date(year, month, currentMonthCount).getDate())
      const Month=String(new Date(year, month, currentMonthCount).getMonth()+1)
      const Year=String(new Date(year, month, currentMonthCount).getFullYear())
      return{year:Year,month:Month,day:Day}
    //   return `${Year}年${Month}月${Day}日`;

  });
//   console.log('dayMatrix',DaysMatrix[1][1].getDate())
  console.log('dayMatrix',DaysMatrix)
  console.log(dayjs('2019-01-10 07:30:20').startOf('year').format());
  console.log(dayjs('2019-01-10 07:30:20').endOf('d').format());
  const WeekDay:FC<{daymatrix:TypeOfDate[]}>=({daymatrix})=>{
      const view=daymatrix.map((d:TypeOfDate)=>{
      return(
          <div className={`M${d.month} D${d.day}`}>
              <div>{d.month}月</div>
              <div>{d.day}日</div>
              
          </div>
      )
      })
    return(
      <div className='calender'>
        {view}
      </div>
    )
  }
    return(
        <div>
            <WeekDay
                daymatrix={DaysMatrix}
            />
            {/* {DaysMatrix[1]} */}
            カレンダー出力
        </div>
    )
}