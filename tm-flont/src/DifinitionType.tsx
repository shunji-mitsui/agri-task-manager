
import React from 'react';

interface childrenProject {
    shildrenName:string,
    startDate:string;
    endDate:string;
    content:string;
  }
  
export interface Project {
    id:string,
    name:string
    startDate:string;
    endDate:string;
    // children:childrenProject[]
  }

