import { Project } from '../../Typed';
import { Grid } from '@mui/material';
import { FC, useContext } from 'react';
import { deleteProject } from '../../Functions';
import { StyledSideBar } from '../../Styled';
import { GanttBar } from './Ganttbar';
import { FieldContext, RenderContext } from '../../UseContext';
import axios from 'axios';

const api = process.env.REACT_APP_BASE_PATH;

export const OneProjectCalender: FC<{
  project: Project;
  DayList: string[];
}> = ({ project, DayList }) => {
  const render = useContext(RenderContext);
  const field = useContext(FieldContext);
  return (
    <Grid container>
      <StyledSideBar
        item
        onClick={() => {
          deleteProject(project.id);
          axios.get(`${api}/field/get`).then((res) => {
            field.setField(res.data);
          });
          console.log('renderFlagが更新された時間', performance.now());
          render.setIsRender(!render.render);
        }}
      >
        {project.name}
      </StyledSideBar>
      <GanttBar project={project} DayList={DayList} />
    </Grid>
  );
};
