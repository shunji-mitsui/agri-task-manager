import React from "react";
import { FC } from "react";
import { Project } from "../../DefinitionType";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import {
  deleteTask,
  createTask,
} from "../FunctionComponents/FunctionForTask";
dayjs.extend(isBetween);

const ViewTask: FC<{
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
  return (
    <div
      onClick={(e) => {
        if (t.task != "-") {
          deleteTask(t);
        } else {
          createTask(project, day);
        }
      }}
    >
      {t.task}
    </div>
  );
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
