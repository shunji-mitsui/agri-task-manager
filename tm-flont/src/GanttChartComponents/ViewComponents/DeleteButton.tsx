import { deleteProject } from '@/GanttChartComponents/FunctionsForGanttChart/FunctionForProject';
import { FC } from 'react';

export const DeleteProjectButton: FC<{ id: string }> = ({ id }) => {
  return (
    <div>
      <button
        onClick={() => {
          deleteProject(id);
        }}
      >
        削除
      </button>
    </div>
  );
};
