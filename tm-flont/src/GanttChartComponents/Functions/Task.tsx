import axios from 'axios';

export const createTask = (parentId: string, day: string) => {
  const newTask = window.prompt('ユーザー名を入力してください', '');

  axios
    .post('http://127.0.0.1:8000/task/create', {
      parentId: parentId,
      task: newTask,
      date: day,
    })
    .then((res) => console.log(res.data));
};

export const deleteTask = (task: { task: string; id: string }) => {
  if (window.confirm('完了しますか')) {
    axios.post('http://127.0.0.1:8000/task/delete', { id: task.id });
  }
};
