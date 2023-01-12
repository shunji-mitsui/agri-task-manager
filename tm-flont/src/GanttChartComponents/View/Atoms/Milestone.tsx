import { Project } from '@/DefinitionType';
import { IsOnTerm } from '../../Functions/Project';
import { RenderContext } from '../../Functions/UseContext';
import { Grid } from '@mui/material';
import { FC, useContext } from 'react';

export const Milestone: FC<{
  day: string;
  project: Project;
}> = ({ day, project }) => {
  const { render, setRender } = useContext(RenderContext);
  const useFlag = IsOnTerm(project, day, render, setRender).flag;
  const content = IsOnTerm(project, day, render, setRender).content;
  const func = IsOnTerm(project, day, render, setRender).func;

  return (
    <Grid item>
      <div
        className={useFlag ? 'Istrue' : ''}
        onClick={() => {
          func();
        }}
      >
        {content}
      </div>
    </Grid>
  );
};
