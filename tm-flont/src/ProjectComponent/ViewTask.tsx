import React from "react";
import {
  useState,
  useEffect,
  FC,
  createContext,
  useContext,
  useReducer,
} from "react";
// import './App.css';
import axios from "axios";
import { Project, Task } from "../DefinitionType";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

export const deleteTask = (
  task: { task: string; id: string },
  project: Project,
  day: string
) => {
  if (task.task != "-") {
    if (window.confirm("完了しますか")) {
      axios.post("http://127.0.0.1:8000/task/delete", { id: task.id });
    }
  } else {
    const newTask = window.prompt("ユーザー名を入力してください", "");
    axios
      .post("http://127.0.0.1:8000/task/create", {
        parentId: project.id,
        task: newTask,
        date: day,
      })
      .then((res) => console.log(res.data));
  }
};

export const createTask = (project: Project, day: string) => {
  const newTask = window.prompt("ユーザー名を入力してください", "");
  axios
    .post("http://127.0.0.1:8000/task/create", {
      parentId: project.id,
      task: newTask,
      date: day,
    })
    .then((res) => console.log(res.data));
};

export const ViewTask: FC<{
  project: Project;
  day: string;
  t: { task: string; id: string };
}> = ({ project, day, t }) => {
  if (!t.task) {
    return (
      <div
        onClick={(e) => {
          createTask(project, day);
        }}
      >
        -
      </div>
    );
  }
  return <div onClick={(e) => deleteTask(t, project, day)}>{t.task}</div>;
};

export const ViewTaskList: FC<{ project: Project; day: string }> = ({
  project,
  day,
}) => {
  let TaskList = [{ id: "", task: "" }];
  project.task.map((t) => {
    if (t.date == day) {
      TaskList.push({ task: t.task, id: t.id });
    } else {
      TaskList.push({ task: "-", id: "" });
    }
  });
  const View = TaskList.map((t) => {
    return (
      <div>
        <ViewTask project={project} t={t} day={day} />
      </div>
    );
  });
  return <div>{View}</div>;
};

// ---------------------------↓古いやつ。参考に残してる

export const SelectorTask: FC<{ taskDate: string; project: Project }> = ({
  taskDate,
  project,
}) => {
  const [flag, setFlag] = useState(true);
  const [taskContent, setTaskContent] = useState("");
  const postTask = () => {
    if (
      dayjs(taskDate).isBetween(project.startDate, project.endDate, null, "[]")
    ) {
      axios
        .post("http://127.0.0.1:8000/task/create", {
          parentId: project.id,
          task: taskContent,
          date: taskDate,
        })
        .then((res) => console.log(res.data));
    } else {
      alert("タスクがプロジェクトの期間内に入っていません");
    }
  };
  if (flag) {
    return (
      <div>
        <select
          name="example"
          onChange={(e) => {
            if (e.target.value == "other") {
              setFlag(!flag);
            } else {
              setTaskContent(e.target.value);
            }
          }}
        >
          <option value="追肥">追肥</option>
          <option value="草抜き">草抜き</option>
          <option value="マルチ">マルチ貼り</option>
          <option value="other">手動入力</option>
        </select>
        <button onClick={postTask}>決定</button>
      </div>
    );
  } else {
    return (
      <div>
        タスクを入力
        <input type="text" onChange={(e) => setTaskContent(e.target.value)} />
        <button onClick={postTask}>決定</button>
      </div>
    );
  }
};

export const RegistorFormForChildTask: FC<{ project: Project }> = ({
  project,
}) => {
  const [taskDate, setTaskDate] = useState("");
  return (
    <div>
      <SelectorTask taskDate={taskDate} project={project} />
      <br />
      <input
        type="Date"
        onChange={(e) => {
          setTaskDate(e.target.value);
        }}
      />
    </div>
  );
};
