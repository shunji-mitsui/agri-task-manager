import { deleteProject } from '@/GanttChartComponents/Function/Project';
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
