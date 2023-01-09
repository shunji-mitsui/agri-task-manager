import React from "react";
import { useState, FC, ReactNode, createContext } from "react";
import { Project } from "../../DefinitionType";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { Milestone } from "./Milestone";
import { AddMilestone } from "./Milestone";
import { FlagContext, GanttBarContext } from "../FunctionComponents/UseContext";
dayjs.extend(isBetween);

const ViewCalender: FC<{
  isChangeMode: boolean;
  setIsChangeMode: React.Dispatch<React.SetStateAction<boolean>>;
  isCreateMode: boolean;
  setIsCreateMode: React.Dispatch<React.SetStateAction<boolean>>;
  target: string;
  setTarget: React.Dispatch<React.SetStateAction<string>>;
  afterDay: string;
  setAfterDay: React.Dispatch<React.SetStateAction<string>>;
  flag: boolean;
  p: Project;
  d: string;
}> = ({
  isChangeMode,
  setIsChangeMode,
  isCreateMode,
  setIsCreateMode,
  target,
  setTarget,
  afterDay,
  setAfterDay,
  flag,
  p,
  d,
}) => {
  // console.log('(カレンダー作成コンポーネント',p)
  const [onTerm, setOnTerm] = useState<boolean>(true);
  return (
    <div className="day">
      <GanttBarContext.Provider
        value={{
          isChangeMode,
          setIsChangeMode,
          isCreateMode,
          setIsCreateMode,
          target,
          setTarget,
          afterDay,
          setAfterDay,
        }}
      >
        <FlagContext.Provider value={{ onTerm, setOnTerm }}>
          {/* <div className={flag ? "" : "display-none"}>
            <AddMilestone day={d} />
          </div> */}
          <div>

          <Milestone project={p} day={d} /><br/>
          </div>
        </FlagContext.Provider>
      </GanttBarContext.Provider>
    </div>
  );
};

export const ViewGanttBar: FC<{
  project: Project[];
  DayList: string[];
  flag: boolean;
}> = ({ project, DayList, flag }) => {
  const [isChangeMode, setIsChangeMode] = useState<boolean>(false);
  const [isCreateMode, setIsCreateMode] = useState<boolean>(false);
  const [target, setTarget] = useState<string>("");
  const [afterDay, setAfterDay] = useState<string>("");
  const ViewProject = project.map((p) => {
    // console.log(p)
    const ViewDay = DayList.map((d) => {
      return (
        <div>
          <ViewCalender
            isChangeMode={isChangeMode}
            setIsChangeMode={setIsChangeMode}
            isCreateMode={isCreateMode}
            setIsCreateMode={setIsCreateMode}
            target={target}
            setTarget={setTarget}
            afterDay={afterDay}
            setAfterDay={setAfterDay}
            flag={flag}
            p={p}
            d={d}
          />
        </div>
      );
    });
    return <div className="AllView">{ViewDay}</div>;
  });
  return <div className="">{ViewProject}</div>;
};
