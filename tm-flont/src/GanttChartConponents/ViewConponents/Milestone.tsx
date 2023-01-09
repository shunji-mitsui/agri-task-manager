import {
  useState,
  useEffect,
  FC,
  createContext,
  useContext,
  useReducer,
} from "react";
import axios from "axios";
import { Project } from "../../DefinitionType";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);
import { ViewTaskList } from "./ViewTask";
import { GanttBarContext } from "../FunctionComponents/UseContext";
import { IsOnTerm } from "../FunctionComponents/FunctionForProject";

export const AddMilestone: FC<{ day: string }> = ({ day }) => {
  const [target, setTarget] = useState("-");
  const { isCreateMode, setIsCreateMode } = useContext(GanttBarContext);
  return (
    <div
      onClick={(e) => {
        if (isCreateMode) {
          setTarget("○");
          setIsCreateMode(!isCreateMode);
          const projectName = window.prompt(
            "プロジェクト名を入力してください",
            ""
          );
        } else {
          setTarget("○");
          setIsCreateMode(!isCreateMode);
        }
      }}
    >
      {target}
    </div>
  );
};

export const Milestone: FC<{
  day: string;
  project: Project;
}> = ({ day, project }) => {
  const useFlag = IsOnTerm(project, day).flag;
  const content = IsOnTerm(project, day).content;
  // console.log('マイルストーン作成1',project.name)
  const func = IsOnTerm(project, day).func;
  const target = IsOnTerm(project, day).target;
  // console.log('マイルストーン作成1',content)
  let task: any;
  if (useFlag) {
    task = (
      <div>
        <ViewTaskList project={project} day={day} />
      </div>
    );
  }
  return (
    <div>
      {target}
      <div
        className={useFlag ? "Istrue" : ""}
        onClick={(e) => {
          func();
        }}
      >
        {content}
        {task}
      </div> 
    </div>
  );
};
