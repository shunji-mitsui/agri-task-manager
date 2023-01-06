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
import { Project, Task } from "../DefinitionType";
import { ProjectHeader, DeleteProject } from "./OneProjectView";
import { Calender } from "../Calender";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { isConstructorDeclaration } from "typescript";
import { create } from "domain";
import { ViewTaskList } from "./ViewTask";
import { ViewProject } from "./ViewProject";
dayjs.extend(isBetween);

// useReducer使ってここからchangeProjectTermに渡すステートを省略したい*1

export const OneDayState: FC<{
  project: Project;
  day: string;
  beforeChangeDay: string;
  setBeforeChangeDay: React.Dispatch<React.SetStateAction<string>>;
  afterChangeDay: string;
  setAfterChangeDay: React.Dispatch<React.SetStateAction<string>>;
  isChangeMode: boolean;
  setIsChangeMode: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  project,
  day,
  beforeChangeDay,
  setBeforeChangeDay,
  afterChangeDay,
  setAfterChangeDay,
  isChangeMode,
  setIsChangeMode,
}) => {
  return (
    <div>
      <ViewProject
        project={project}
        day={day}
        beforeChangeDay={beforeChangeDay}
        setBeforeChangeDay={setBeforeChangeDay}
        afterChangeDay={afterChangeDay}
        setAfterChangeDay={setAfterChangeDay}
        isChangeMode={isChangeMode}
        setIsChangeMode={setIsChangeMode}
      />
    </div>
  );
};

export const Gantt: FC<{ project: Project; DayList: string[] }> = ({
  project,
  DayList,
}) => {
  const [beforeChangeDay, setBeforeChangeDay] = useState("");
  const [afterChangeDay, setAfterChangeDay] = useState("");
  const [isChangeMode, setIsChangeMode] = useState(false);
  const ViewDay = DayList.map((d) => {
    return (
      <div className="day">
        {/* *1 */}
        <OneDayState
          project={project}
          day={d}
          beforeChangeDay={beforeChangeDay}
          setBeforeChangeDay={setBeforeChangeDay}
          afterChangeDay={afterChangeDay}
          setAfterChangeDay={setAfterChangeDay}
          isChangeMode={isChangeMode}
          setIsChangeMode={setIsChangeMode}
        />
      </div>
    );
  });
  return <div className="AllView">{ViewDay}</div>;
};
