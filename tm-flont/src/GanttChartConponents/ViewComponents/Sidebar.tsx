import React, { useState, useContext, FC } from "react";
import { ViewGanttBar } from "./GanttBar";
import { Project } from "../../DefinitionType";
import { deleteProject } from "../FunctionsForGanttChart/FunctionForProject";
import dayjs from "dayjs";
import { RenderContext } from "../FunctionsForGanttChart/UseContext";
// import { AddForm } from "./AddForm";
// import { DeleteProjectButton } from "./DeleteButton";

export const ProjectContent: FC<{
  id: string;
  content: string;
}> = ({ id, content }) => {
  const { render, setRender } = useContext(RenderContext);

  return (
    <div>
      品目:{content}
      <button
        onClick={(e) => {
          deleteProject(id);
          setRender(!render);
        }}
      >
        削除
      </button>
    </div>
  );
};

export const ProjectSidebar: FC<{ project: Project[] }> = ({ project }) => {
  const view = project.map((p) => {
    return (
      <div>
        <div className="AllView">
          <div className="SideBar">
            <ProjectContent id={p.id} content={p.name} />
          </div>
        </div>
      </div>
    );
  });
  return <div>{view}</div>;
};
