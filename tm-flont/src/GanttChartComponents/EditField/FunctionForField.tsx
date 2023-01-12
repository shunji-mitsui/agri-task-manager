import axios from 'axios';

export const createField = (field: string) => {
  axios
    .post('http://127.0.0.1:8000/field/post', {
      field: field,
    })
    .then((res) => {
      console.log(res.data);
    });
};

export const deleteField = (id: string) => {
  axios.post('http://127.0.0.1:8000/field/delete', {
    id: id,
  });
};

export const updateField = (id: string, name: string) => {
  axios
    .post('http://127.0.0.1:8000/field/update', {
      id: id,
      name: name,
    })
    .then((res) => {
      console.log(res.data);
    });
};
