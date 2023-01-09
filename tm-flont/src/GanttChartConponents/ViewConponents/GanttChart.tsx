import React, { useState, useEffect, FC } from "react";
import { FProject } from "../../DefinitionType";
import { getProject } from "../FunctionComponents/FunctionForProject";
import { Headline_GanttChart } from "./HeadLine";
import { ProjectSidebar } from "./Sidebar";
import { ViewGanttBar } from "./GanttBar";
import dayjs from "dayjs";

const Main_Ganttchart: FC<{ projectList: FProject[] }> = ({ projectList }) => {
  const [DayList, setDayList] = useState(
    [...Array(60)].map((_, i) => dayjs().add(i, "d").format("YYYY-MM-DD"))
  );
  console.log(projectList,'iiiiiiiiiiiii')
  const [flag, setFlag] = useState(false);
  const ViewProjectByField = projectList.map((p) => {
    // console.log(p.project,'uuuuuuuuuuiui')
    return (
      <div className='GanttBar'>
        <div className="SideBar AllView">
          <div className='color'>
          {p.field}
          </div>
          <ProjectSidebar project={p.project} />
        </div>
        <div>
          <ViewGanttBar project={p.project} DayList={DayList} flag={flag} />
        </div>
      </div>
    );
  });
  return <div>{ViewProjectByField}</div>;
};

// ProjectSidebar;

export const ViewGanttChart = () => {
  const [renderFlag, setRenderFlag] = useState(false);
  const [viewProject, setViewProject] = useState<FProject[]>([
    {
      field: "",
      project: [
        {
          field: "",
          id: "",
          name: "",
          startDate: "",
          endDate: "",
          task: [{ parentId: "", id: "", task: "", date: "" }],
        },
      ],
    },
  ]);
  useEffect(() => {
    getProject(setViewProject);
  }, [renderFlag]);
  return (
    <div className='GanttChart'>
      <button
        onClick={(e) => {
          setRenderFlag(!renderFlag);
        }}
        className="SideBar"
      >
        更新
      </button>
      <Headline_GanttChart />
      <Main_Ganttchart projectList={viewProject} />
    </div>
  );
};
