import { Project } from './Typed';
import axios from 'axios';
import { Field } from './Typed';

const api = process.env.REACT_APP_BASE_PATH;

export const updateProjectDate = (
  project: Project,
  target: string,
  Day: string,
) => {
  axios
    .post(`${api}/project/update`, {
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
    });
};

export const postProject = (
  fieldId: string,
  start: string,
  end: string,
  name: string,
) => {
  axios
    .post(`${api}/project/post`, {
      fieldId: fieldId,
      start: start,
      end: end,
      item: name,
    })
    .then((res) => {
      if (res.data.status == 100) {
        alert(
          'その期間は別の予定が入っています。\n 期間の重複を許可したい場合は以下の操作を行ってください\nエリア編集>"プロジェクト期間の重複"を許可',
        );
      }
    });
  // setFlag(!flag);
};
export const getProject = (
  setProject: React.Dispatch<React.SetStateAction<Project[]>>,
  fieldId: string,
) => {
  axios
    .post(`${api}/project/get`, {
      id: fieldId,
    })
    .then((res) => {
      setProject(res.data);
    });
};

export const deleteProject = async (id: string) => {
  await axios
    .post(`${api}/project/delete`, {
      id: id,
    })
    .then(() => {
      alert('削除しました');
    });
};

export const getField = (
  setField: React.Dispatch<React.SetStateAction<Field[]>>,
) => {
  axios.get(`${api}/field/get`).then((res) => {
    setField(res.data);
    console.log('getField, res.data is', res.data);
  });
};

export const createField = (field: string, color: string) => {
  axios
    .post(`${api}/field/post`, {
      field: field,
      color: color,
    })
    .then((res) => {
      console.log(res.data);
    });
};

export const deleteField = (id: string) => {
  axios.post(`${api}/field/delete`, {
    id: id,
  });
};

export const changePermissionSameTerm = (
  fieldId: string,
  permission: boolean,
) => {
  console.log(`リクエストデータは${permission}です`);
  axios
    .post(`${api}/field/permission/change`, {
      fieldId: fieldId,
      permission: permission,
    })
    .then((res) => {
      console.log('帰ってきたステータスは', res.data);
      if (res.data.status == 100) {
        alert(
          '期間の重複しているプロジェクトが存在するためpermissionを変更できませんでした。',
        );
      }
    });
};

export const updateField = (id: string, name: string) => {
  axios
    .post(`${api}/field/update`, {
      id: id,
      name: name,
    })
    .then((res) => {
      console.log(res.data);
    });
};
