import { FC } from 'react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { Task } from '@/DefinitionType';
import { createTask, deleteTask } from '../Functions/Task';
dayjs.extend(isBetween);

const ViewTask: FC<{
  day: string;
  t: { task: string; id: string };
  parentId: string;
}> = ({ day, t, parentId }) => {
  if (!t.task) {
    return (
      <div
        onClick={() => {
          createTask(parentId, day);
        }}
      >
        -
      </div>
    );
  }
  return (
    <div
      onClick={() => {
        if (t.task != '-') {
          deleteTask(t);
        } else {
          createTask(parentId, day);
        }
      }}
    >
      {t.task}
    </div>
  );
};

const ViewTaskList: FC<{
  taskList: Task[];
  day: string;
  parentId: string;
}> = ({ taskList, day, parentId }) => {
  const TaskList = [{ id: '', task: '' }];
  taskList.map((t) => {
    if (t.date == day) {
      TaskList.push({ task: t.task, id: t.id });
    } else {
      TaskList.push({ task: '-', id: '' });
    }
  });
  const View = TaskList.map((t, key) => {
    return (
      <div key={key}>
        <ViewTask t={t} day={day} parentId={parentId} />
      </div>
    );
  });
  return <div>{View}</div>;
};
