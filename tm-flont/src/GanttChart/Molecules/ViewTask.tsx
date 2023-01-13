import { Project } from '@/DefinitionType';
import { Grid } from '@mui/material';
import { FC } from 'react';
import { StyledSideBar } from '../Styled';
import { TaskCalender } from './Molecules';

export const ViewTask: FC<{ project: Project; DayList: string[] }> = ({
  project,
  DayList,
}) => {
  const view = project.task.map((t, key) => {
    return (
      <Grid container key={key}>
        <StyledSideBar item>{t.task}</StyledSideBar>
        <Grid item>
          <TaskCalender task={t} DayList={DayList} />
        </Grid>
      </Grid>
    );
  });
  return <Grid>{view}</Grid>;
};
