import { Project } from '../DefinitionType';
import axios from 'axios';

export const updateProjectDate = (
  project: Project,
  target: string,
  Day: string,
) => {
  axios
    .post('http://127.0.0.1:8000/project/update', {
      id: project.id,
      afterDay: Day,
      target: target,
    })
    .then((response) => {
      if (response.data.status == 100) {
        alert('その期間は別の予定が入っています。');
      } else if (response.data.status == 101) {
        alert('開始日が終了日よりも後になっています。');
      }
      console.log(response.data);
    });
};

export const postProject = (
  fieldId: string,
  start: string,
  end: string,
  name: string,
) => {
  axios
    .post('http://127.0.0.1:8000/project/post', {
      fieldId: fieldId,
      start: start,
      end: end,
      item: name,
    })
    .then((res) => console.log(res.data));
};
export const getProject = (
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

export const deleteProject = (id: string) => {
  axios
    .post('http://127.0.0.1:8000/project/delete', {
      id: id,
    })
    .then(() => {
      alert('削除しました');
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
