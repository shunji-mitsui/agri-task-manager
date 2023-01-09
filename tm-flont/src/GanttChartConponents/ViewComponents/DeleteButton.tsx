import React, { FC } from "react";
import { deleteProject } from "../FunctionsForGanttChart/FunctionForProject";

const DeleteProjectButton: FC<{ id: string }> = ({ id }) => {
  return (
    <div>
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
