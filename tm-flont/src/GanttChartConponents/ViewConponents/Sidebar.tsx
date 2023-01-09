import React, { useState, FC } from "react";
import { ViewGanttBar } from "./GanttBar";
import { Project } from "../../DefinitionType";
import { deleteProject } from "../FunctionComponents/FunctionForProject";
import dayjs from "dayjs";
import { AddForm } from "./AddForm";
// import { DeleteProjectButton } from "./DeleteButton";

export const ProjectContent: FC<{
  id: string;
  content: string;
}> = ({ id, content }) => {
  return (
    <div>
      品目:{content}
      <button
        onClick={(e) => {
          deleteProject(id);
        }}
      >
        削除
      </button>
    </div>
  );
};

export const ProjectSidebar: FC<{ project: Project[] }> = ({ project }) => {
  const [DayList, setDayList] = useState(
    [...Array(30)].map((_, i) => dayjs().add(i, "d").format("YYYY-MM-DD"))
  );

  const [flag, setFlag] = useState(false);
  const view = project.map((p) => {
    return (
      <div>
        <div className="AllView">
          <div className="SideBar">
            <ProjectContent id={p.id} content={p.name} />
            <button onClick={(e) => setFlag(!flag)}>追加</button>
            <AddForm field={p.field} flag={flag} setFlag={setFlag} />
          </div>
          <div>
            {/* <ViewGanttBar project={p} DayList={DayList} flag={flag} /> */}
          </div>
        </div>
      </div>
    );
  });
  return <div>{view}</div>;
};
