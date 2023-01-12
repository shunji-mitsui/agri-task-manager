import { Project, Task } from '@/DefinitionType';
import { Grid, styled } from '@mui/material';
// import { Grid } from '@mui/material';
import { FC } from 'react';
// import { ViewTaskList } from './ViewTask';
import { OneProjectCalender } from '../Molecules/OneProjectCalender';

export const StyledDay = styled(Grid)(`
  color: grey;
  width:30px;
  padding-left:10px;
  border: solid 1px black;
`);

const ViewDayTask: FC<{ taskList: Task[]; DayList: string[] }> = ({
  taskList,
  DayList,
}) => {
  let content = '-';
  const view = taskList.map((task, key) => {
    const viewDay = DayList.map((d, key) => {
      if (task.date === d) {
        content = '○';
      } else {
        content = '-';
      }
      return (
        <Grid item key={key}>
          <StyledDay>{content}</StyledDay>
        </Grid>
      );
    });
    return (
      <Grid item key={key}>
        <Grid container>{viewDay}</Grid>
      </Grid>
    );
  });

  return <Grid container>{view}</Grid>;
};

export const ViewGanttBar: FC<{
  project: Project[];
  DayList: string[];
  flag: boolean;
}> = ({ project, DayList, flag }) => {
  const ViewProject = project.map((p, key) => {
    return (
      <Grid item key={key}>
        <Grid container>
          <OneProjectCalender
            project={p}
            task={p.task}
            flag={flag}
            DayList={DayList}
          />
          <ViewDayTask taskList={p.task} DayList={DayList} />
        </Grid>
      </Grid>
    );
  });
  return <div>{ViewProject}</div>;
};
