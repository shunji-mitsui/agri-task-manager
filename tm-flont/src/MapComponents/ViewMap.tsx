import { FC, useState } from 'react';
// import axios from 'axios';

interface ToDo {
  day: string;
  contents: {
    // isDone:boolean,
    task: string;
    id: string;
    field: string;
  }[];
}

const ViewToDo: FC<{ toDo: ToDo[] }> = ({ toDo }) => {
  const viewByDay = toDo.map((t, key) => {
    const viewByTask = t.contents.map((c, key) => {
      return (
        <div key={key}>
          {c.task}
          {c.field}
          <br />
          <button
            onClick={() => {
              // deleteTask({ task: c.task, id: c.id });
            }}
          >
            完了
          </button>
        </div>
      );
    });
    return (
      <div key={key} className="board-element">
        <div>{t.day}</div>
        <div>{viewByTask}</div>
      </div>
    );
  });

  return <div className="AllView">{viewByDay}</div>;
};

export const Dashboard = () => {
  const [count, setCount] = useState(0);

  // const getTask = async () => {
  //   const result = await axios.get('http://127.0.0.1:8000/task/get');
  //   setToDo(result.data);
  // };

  // useEffect(() => {
  //   getTask();
  // }, []);
  // useEffect(() => {
  //   getTask();
  // }, [count]);
  // const [toDo, setToDo] = useState<ToDo[]>([
  //   { day: '', contents: [{ task: '', id: '', field: '' }] },
  // ]);

  return (
    <div className="AllView">
      ボード
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +
      </button>
      {/* <ViewToDo toDo={toDo} /> */}
    </div>
  );
};
