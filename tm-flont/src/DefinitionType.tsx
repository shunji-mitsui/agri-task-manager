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
