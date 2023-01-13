export interface Task {
  parentId: string;
  id: string;
  task: string;
  date: string;
}

export interface Project {
  id: string;
  field: string;
  name: string;
  startDate: string;
  endDate: string;
  task: Task[];
}

export interface Field {
  field: string;
  id: string;
  color: string;
}

export const defaultStateProject = [
  {
    field: '',
    id: '',
    name: '',
    startDate: '',
    endDate: '',
    task: [
      {
        parentId: '',
        date: '',
        id: '',
        task: '',
      },
    ],
  },
];

export const defaultStateField = [
  {
    field: '',
    id: '',
    color: '',
  },
];
