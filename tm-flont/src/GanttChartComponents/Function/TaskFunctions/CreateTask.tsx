import { Project } from '@/DefinitionType';
import axios from 'axios';

export const createTask = (project: Project, day: string) => {
  const newTask = window.prompt('ユーザー名を入力してください', '');
  axios
    .post('http://127.0.0.1:8000/task/create', {
      parentId: project.id,
      task: newTask,
      date: day,
    })
    .then((res) => console.log(res.data));
};
