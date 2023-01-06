import { endianness } from "os";
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
import { ProjectHeader, DeleteProject } from "./OneProjectView";
import { Calender } from "../Calender";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { isConstructorDeclaration } from "typescript";
import { create } from "domain";
import { ViewTaskList } from "./ViewTask";
import { setFlagsFromString } from "v8";
dayjs.extend(isBetween);

// *1
export const ChangeProjectTerm = (
  target: string,
  beforeChangeDay: string,
  setBeforeChangeDay: React.Dispatch<React.SetStateAction<string>>,
  afterChangeDay: string,
  setAfterChangeDay: React.Dispatch<React.SetStateAction<string>>,
  isChangeMode: boolean,
  setIsChangeMode: React.Dispatch<React.SetStateAction<boolean>>,
  day: string,
  project: Project
) => {
  console.log("ddddddddddddddd", target);
  if (!isChangeMode) {
    setBeforeChangeDay(target);
    setIsChangeMode(true);
    console.log("trueに入ってます");
  } else {
    console.log("falseに入ってます");
    setAfterChangeDay(day);

    axios
      .post("http://127.0.0.1:8000/project/update", {
        id: project.id,
        afterChangeDay: day,
        target: target,
        field: project.field,
      })
      .then((res) => {
        console.log(res.data);
      });

    setIsChangeMode(false);
  }
};

export const ViewProject: FC<{
  day: string;
  project: Project;
  beforeChangeDay: string;
  setBeforeChangeDay: React.Dispatch<React.SetStateAction<string>>;
  afterChangeDay: string;
  setAfterChangeDay: React.Dispatch<React.SetStateAction<string>>;
  isChangeMode: boolean;
  setIsChangeMode: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  day,
  project,
  beforeChangeDay,
  setBeforeChangeDay,
  afterChangeDay,
  setAfterChangeDay,
  isChangeMode,
  setIsChangeMode,
}) => {
  // console.log('ischaneMode:',isChangeMode)
  const IsOnTerm = (day: string, start: string, end: string) => {
    let flag: boolean;
    let content: string;
    let func: () => void;
    if (dayjs(day).isBetween(start, end, null, "()")) {
      flag = true;
      content = "●";
      func = () => {
        console.log("on term");
        if (isChangeMode) {
          console.log("ddddddddddddddddddddddddddd");
          setAfterChangeDay(day);
          // const target='start'
          axios
            .post("http://127.0.0.1:8000/project/update", {
              id: project.id,
              afterChangeDay: day,
              target: beforeChangeDay,
            })
            .then((res) => {
              console.log(res.data);
            });
        }
      };
    } else if (day === start) {
      flag = true;
      content = "☆";
      func = () => {
        console.log("start");

        ChangeProjectTerm(
          "start",
          beforeChangeDay,
          setBeforeChangeDay,
          afterChangeDay,
          setAfterChangeDay,
          isChangeMode,
          setIsChangeMode,
          day,
          project
        );
      };
    } else if (day === end) {
      flag = true;
      content = "☆";
      func = () => {
        console.log("end");
        ChangeProjectTerm(
          "end",
          beforeChangeDay,
          setBeforeChangeDay,
          afterChangeDay,
          setAfterChangeDay,
          isChangeMode,
          setIsChangeMode,
          day,
          project
        );
      };
    } else {
      flag = false;
      content = "○";
      func = () => {
        console.log("else");
        if (isChangeMode) {
          setAfterChangeDay(day);
          axios
            .post("http://127.0.0.1:8000/project/update", {
              id: project.id,
              afterChangeDay: day,
              target: beforeChangeDay,
            })
            .then((res) => {
              console.log(res.data);
            });
        }
      };
    }
    return { flag: flag, content: content, func: func };
  };
  const flag = IsOnTerm(day, project.startDate, project.endDate).flag;
  const content = IsOnTerm(day, project.startDate, project.endDate).content;
  const func = IsOnTerm(day, project.startDate, project.endDate).func;
  // console.log('target',target)
  let task: any;
  if (flag) {
    task = (
      <div>
        <ViewTaskList project={project} day={day} />
      </div>
    );
  }

  return (
    <div>
      <div
        className={flag ? "Istrue" : ""}
        onClick={(e) => {
          // *1
          func();
          // ChangeProjectTerm(beforeChangeDay,setBeforeChangeDay,afterChangeDay,setAfterChangeDay,isChangeMode,setIsChangeMode,day,project)
        }}
      >
        {content}
        {task}
      </div>
    </div>
  );
};
