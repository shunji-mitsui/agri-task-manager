import React, { useState, useEffect, FC } from "react";
import { FProject, Project } from "../../DefinitionType";
import { getProject } from "../FunctionComponents/FunctionForProject";
import { Headline_GanttChart } from "./HeadLine";
import { ProjectSidebar } from "./Sidebar";
import { ViewGanttBar } from "./GanttBar";
import dayjs from "dayjs";
import { AddForm } from "./Milestone";

const ViewProjectByField:FC<{project:FProject}>=({project})=>{
  const [DayList, setDayList] = useState(
    [...Array(60)].map((_, i) => dayjs().add(i, "d").format("YYYY-MM-DD"))
  );
  const [flag, setFlag] = useState(false);
  return(
    <div>
      <div className="GanttBar">
        <div className="SideBar AllView">
          <div className="color">{project.field}</div>
          <button onClick={(e) => setFlag(!flag)}>新規作成</button>
          <ProjectSidebar project={project.project} />
        </div>
        <div>
          <div className={flag ? "" : "display-none"}>
            <AddForm DayList={DayList} field={project.field}/>
          </div>
          <ViewGanttBar project={project.project} DayList={DayList} flag={flag} />
        </div>
      </div>
    </div>
  )
}

const Main_Ganttchart: FC<{ projectList: FProject[] }> = ({ projectList }) => {
  console.log(projectList,'iiiiiiiiiiiii')
  const ViewField = projectList.map((p) => {
    // console.log(p.project,'uuuuuuuuuuiui')
    // const [addflag,setAddflag]=useState(false)
    return (
      <div>
        <ViewProjectByField project={p}/>
      </div>
    );
  });
  return <div>{ViewField}</div>;
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
