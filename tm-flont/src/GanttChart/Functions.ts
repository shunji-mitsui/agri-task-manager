import { Project } from '@/DefinitionType';
import axios from 'axios';

export const getPROject = (
  setProject: React.Dispatch<React.SetStateAction<Project[]>>,
  fieldId: string,
) => {
  axios
    .post('http://127.0.0.1:8000/project/get', {
      id: fieldId,
    })
    .then((res) => {
      setProject(res.data);
    });
};

export const getField = (
  setField: React.Dispatch<
    React.SetStateAction<
      {
        id: string;
        field: string;
        color: string;
      }[]
    >
  >,
) => {
  axios.get('http://127.0.0.1:8000/field/get').then((res) => {
    setField(res.data);
  });
};

export const deleteTask = (taskId: string) => {
  if (window.confirm('完了しますか')) {
    axios.post('http://127.0.0.1:8000/task/delete', { id: taskId });
  }
};
export const createTask = (id: string, day: string, newTask: string) => {
  axios
    .post('http://127.0.0.1:8000/task/create', {
      parentId: id,
      task: newTask,
      date: day,
    })
    .then((res) => console.log(res.data));
};

export const postProject = (
  fieldId: string,
  start: string,
  end: string,
  name: string,
) => {
  axios.post('http://127.0.0.1:8000/project/post', {
    fieldId: fieldId,
    start: start,
    end: end,
    item: name,
  });
};
