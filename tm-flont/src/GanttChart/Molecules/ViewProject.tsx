import { Project } from '../..//DefinitionType';
import { Grid } from '@mui/material';
import { FC } from 'react';
import { deleteProject } from '../Functions';
import { StyledSideBar } from '../Styled';
import { GanttBar } from './Molecules';

export const ViewProject: FC<{ project: Project; DayList: string[] }> = ({
  project,
  DayList,
}) => {
  return (
    <Grid container>
      <StyledSideBar item onClick={() => deleteProject(project.id)}>
        {project.name}
      </StyledSideBar>
      <GanttBar project={project} DayList={DayList} />
    </Grid>
  );
};
