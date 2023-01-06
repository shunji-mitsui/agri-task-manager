import React, { FC, useState } from "react";
import { Router } from "react-router-dom";
import "./App.css";
import dayjs from "dayjs";
import { Project } from "./DefinitionType";

export interface TypeOfDate {
  year: string;
  month: string;
  day: string;
}

export const ViewDay: FC<{ DayList: string[]; FlagList: boolean[] }> = (
  DayList
) => {
  // console.log(DayList.FlagList)
  let content: string;

  const View2 = DayList.FlagList.map((f) => {
    if (f) {
      content = "●";
    } else {
      content = "○";
    }
    return <div>{content}</div>;
  });

  const View1 = DayList.DayList.map((d) => {
    return (
      <div key={`${d}`}>
        {d}ここに出力します。
        <div>{View2}</div>
      </div>
    );
  });

  return <div>{View1}</div>;
};

const TaskDoInfo = (d: string, flag: boolean, ProjectList: Project[]) =>
  ProjectList.map((p) => {
    flag = false;
    if (p.startDate == d) {
      flag = true;
    } else if (p.endDate == d) {
      console.log("falseに入りました");
      console.log(d);
      flag = true;
    }
    console.log("Iiiiiiiii", flag, d);
    return { id: p.id, flag: flag };
  });

const ViewProjectStateByDay: FC<{
  TaskDoInfo: { id: string; flag: boolean }[];
}> = (props) => {
  console.log("taskdoinfo野中み", props.TaskDoInfo);
  console.log("day");
  let check = "";
  const view = props.TaskDoInfo.map((t) => {
    console.log("uuuuuuuu", t.flag);
    if (t.flag) {
      check = "○";
    } else {
      check = "×";
    }
    return (
      <div key={`${t.id}`}>
        {check}
        <br />
        <br />
        <br />
        <br />
        <br />
        _____________________
      </div>
    );
  });
  console.log(props.TaskDoInfo);
  return <div>{view}</div>;
};

export const Calender: FC<{ ProjectList: Project[] }> = (props) => {
  const DayList = [
    "2023-01-01",
    "2023-01-02",
    "2023-01-03",
    "2023-01-04",
    "2023-01-05",
    "2023-01-06",
  ];

  const DayRoller = DayList.map((d) => {
    return (
      <div>
        {d}
        <ViewProjectStateByDay
          TaskDoInfo={TaskDoInfo(d, false, props.ProjectList)}
        />
      </div>
    );
  });

  return <div className="ViewCalender">{DayRoller}</div>;
};
