
import React from 'react';

export interface Task {
    parentId:string,
    id:string;
    task:string,
    date:string;
  }
  
export interface Project {
    id:string,
    name:string
    startDate:string;
    endDate:string;
    task:Task[]
  }

