import { Project, Task } from '@/DefinitionType';
// import { updateProjectDate } from '@/GanttChartComponents/Functions/Project';
import { Grid } from '@mui/material';
import dayjs from 'dayjs';
import { FC, useState } from 'react';
import { createTask, deleteTask } from '../Functions';
import { StyledDay } from '../Styled';
import axios from 'axios';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const updateProjectDate = (project: Project, target: string, Day: string) => {
  axios
    .post('http://127.0.0.1:8000/project/update', {
      id: project.id,
      afterDay: Day,
      target: target,
    })
    .then((res) => {
      if (res.data.status == 100) {
        alert('その期間は別の予定が入っています。');
      } else if (res.data.status == 101) {
        alert('開始日が終了日よりも後になっています。');
      }
      console.log(res.data);
    });
};

export const GanttBar: FC<{ project: Project; DayList: string[] }> = ({
  project,
  DayList,
}) => {
  let content = '○';
  let target = '';
  const [changeDate, setChangeDate] = useState(['']);
  const view = DayList.map((d, key) => {
    if (dayjs(d).isBetween(project.startDate, project.endDate, null, '()')) {
      content = '●';
    } else if (d === project.startDate) {
      content = '☆';
      target = 'start';
    } else if (d === project.endDate) {
      content = '＊';
      target = 'end';
    } else {
      content = '○';
    }
    return (
      <StyledDay
        item
        key={key}
        onClick={() => {
          if (changeDate[0] == '') {
            setChangeDate([d]);
          } else {
            changeDate.push(d);
            setChangeDate(changeDate);
            updateProjectDate(project, target, d);
            setChangeDate(['']);
          }
        }}
      >
        {content}
      </StyledDay>
    );
  });
  return (
    <Grid item>
      <Grid container>{view}</Grid>
    </Grid>
  );
};

export const TaskCalender: FC<{ task: Task; DayList: string[] }> = ({
  task,
  DayList,
}) => {
  let content = '';
  let targetFlag = false;
  const view = DayList.map((d, key) => {
    if (d === task.date) {
      content = '◉';
      targetFlag = true;
    } else {
      content = '';
      targetFlag = false;
    }
    return (
      <StyledDay item key={key}>
        <Grid
          onClick={() => (targetFlag ? console.log('') : deleteTask(task.id))}
        >
          {content}
        </Grid>
      </StyledDay>
    );
  });

  return <Grid container>{view}</Grid>;
};

export const AddTaskForm: FC<{
  id: string;
  DayList: string[];
  newTask: string;
}> = ({ id, DayList, newTask }) => {
  const view = DayList.map((d, key) => {
    return (
      <StyledDay
        item
        key={key}
        onClick={() => {
          alert(`新しいタスク:${newTask}`);
          createTask(id, d, newTask);
        }}
      >
        -
      </StyledDay>
    );
  });
  return <Grid container>{view}</Grid>;
};
