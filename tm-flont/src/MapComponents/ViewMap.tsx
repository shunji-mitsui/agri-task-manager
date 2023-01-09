import { useState, useEffect, createContext, useContext, FC } from "react";
import axios from "axios";
// import { RuleTester } from "eslint";
// import {createTask} from '../TaskFunctions/CreateTask'
// import { deleteTask } from "../GanttChartConponents/FunctionsForGanttChart/FunctionForTask";

interface Area {
  isUsing: boolean;
  item?: string;
}
interface Map {
  area: string;
  Area: Area;
}

// export const ViewArea = () => {
//   return <div>エリア出力</div>;
// };

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
  const viewByDay = toDo.map((t) => {
    const viewByTask = t.contents.map((c) => {
      return (
        <div>
          {c.task}
          {c.field}
          <br />
          <button
            onClick={(e) => {
              // deleteTask({ task: c.task, id: c.id });
            }}
          >
            完了
          </button>
        </div>
      );
    });
    return (
      <div className="board-element">
        <div>{t.day}</div>
        <div>{viewByTask}</div>
      </div>
    );
  });

  return <div className="AllView">{viewByDay}</div>;
};

export const Dashboard = () => {
  const [count, setCount] = useState(0);
  const [taskName, setTaskName] = useState("");

  const getTask = async () => {
    const result = await axios.get("http://127.0.0.1:8000/task/get");
    console.log(result.data, "iiiiiiiiiiiiiiiiiiiii");
    setToDo(result.data);
  };

  useEffect(() => {
    getTask();
  }, []);
  useEffect(() => {
    getTask();
  }, [count]);
  const [toDo, setToDo] = useState<ToDo[]>([
    { day: "", contents: [{ task: "", id: "", field: "" }] },
  ]);

  return (
    <div className="AllView">
      ボード
      <button
        onClick={(e) => {
          setCount(count + 1);
        }}
      >
        +
      </button>
      <ViewToDo toDo={toDo} />
    </div>
  );
};
