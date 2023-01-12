import { useContext, FC } from 'react';
import { Grid } from '@mui/material';
import { Project, Task } from '@/DefinitionType';
import { RenderContext } from '../../Functions/UseContext';
import { DeleteButton, AddButton } from '../Atoms/Buttons';

const ViewTask = () => {
  return <Grid>1</Grid>;
};

export const ViewTaskList: FC<{ taskList: Task[] }> = ({ taskList }) => {
  // const taskList = ['タスク1', 'タスク2', 'タスク3', 'タスク4'];
  const view = taskList.map((t, key) => {
    return <Grid key={key}>{t.task}</Grid>;
  });
  return <Grid>{view}</Grid>;
};

export const ProjectContent: FC<{
  id: string;
  project: Project;
}> = ({ id, project }) => {
  const { render, setRender } = useContext(RenderContext);

  return (
    <Grid>
      {project.name}
      <DeleteButton id={id} render={render} setRender={setRender} />
      <AddButton />
      <ViewTaskList taskList={project.task} />
    </Grid>
  );
};

export const ProjectSidebar: FC<{ project: Project[] }> = ({ project }) => {
  const view = project.map((p, key) => {
    return (
      <div key={key}>
        <ProjectContent id={p.id} project={p} />
      </div>
    );
  });
  return <div>{view}</div>;
};
