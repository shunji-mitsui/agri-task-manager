import { endianness } from "os";
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
import { FProject, Project } from "../../DefinitionType";
import { GanttBarContext, FlagContext, RenderContext } from "./UseContext";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

// const postProject = (
//   item: string,
//   field: string,
//   start: string,
//   end: string,
//   f: boolean,
//   setF: React.Dispatch<React.SetStateAction<boolean>>
// ) => {
//   axios
//     .post("http://127.0.0.1:8000/project", {
//       item: item,
//       field: field,
//       start: start,
//       end: end,
//     })
//     .then((res) => {
//       console.log(res.data);
//       if (res.data.status == 100) {
//         alert("その期間は予定が入っています");
//       } else if (res.data.status == 101) {
//         alert("開始日が終了日よりも後になっています。");
//       }
//     });
//   setF(!f);
// };

export const getProject = async (
  setViewProject: (value: React.SetStateAction<FProject[]>) => void
) => {
  await axios.get("http://127.0.0.1:8000/project/get").then((res) => {
    setViewProject(res.data);
  });
};

export const deleteProject = async (id: string) => {
  
  await axios
    .post("http://127.0.0.1:8000/project/delete", {
      id: id,
    })
    .then((res) => {
      console.log(res.data);
      // setRender(!render)
    });
};

const UpDateProject = (id: string, item: string) => {
  axios
    .post("http://127.0.0.1:8000/project/update", {
      id: id,
      target: "name",
      value: item,
    })
    .then((res) => {
      if (res.data.status == 100) {
        alert("その期間は別の予定が入っています。");
      } else if (res.data.status == 101) {
        alert("開始日が終了日よりも後になっています。");
      }
      console.log(res.data);
    });
};

export const updateProjectDate = (
  project: Project,
  target: string,
  Day: string,
  render: boolean,
  setRender: (value: boolean) => void,
) => {
  axios
    .post("http://127.0.0.1:8000/project/update", {
      id: project.id,
      afterDay: Day,
      target: target,
    })
    .then((res) => {
      if (res.data.status == 100) {
        alert("その期間は別の予定が入っています。");
      } else if (res.data.status == 101) {
        alert("開始日が終了日よりも後になっています。");
      }
      setRender(!render)
      console.log(res.data);
    });
};

export const IsOnTerm = (project: Project, day: string,render:boolean,setRender: (value: boolean) => void) => {
  // let flag: boolean;
  const start = project.startDate;
  const end = project.endDate;
  const { onTerm, setOnTerm } = useContext(FlagContext);
  const { target, setTarget } = useContext(GanttBarContext);
  const { isChangeMode, setIsChangeMode } = useContext(GanttBarContext);
  let content: string;
  let func: () => void;
  if (dayjs(day).isBetween(start, end, null, "()")) {
    setOnTerm(true);
    content = "●";
    func = () => {
      if (isChangeMode) {
        // setAfterDay(day);
        updateProjectDate(project, target, day, render, setRender);
        setIsChangeMode(!isChangeMode);
      }
    };
  } else if (day === start) {
    setOnTerm(true);
    content = "☆";
    func = () => {
      if (isChangeMode) {
        updateProjectDate(project, target, day, render, setRender);
      } else {
        setTarget("start");
        console.log(target);
        const new_target = "end";
      }
      setIsChangeMode(!isChangeMode);
    };
  } else if (day === end) {
    setOnTerm(true);
    content = "＊";
    func = () => {
      if (isChangeMode) {
        updateProjectDate(project, target, day, render, setRender);
      } else {
        setTarget("end");
        console.log(target);
        // setTarget(
      }
      setIsChangeMode(!isChangeMode);
    };
  } else {
    setOnTerm(false);
    content = "○";
    func = () => {
      if (isChangeMode) {
        updateProjectDate(project, target, day, render, setRender);
        setIsChangeMode(!isChangeMode);
      }
    };
  }
  return { flag: onTerm, content: content, func: func, target: target };
};
