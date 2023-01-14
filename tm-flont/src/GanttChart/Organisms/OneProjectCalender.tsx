import { Grid } from '@mui/material';
import { FC, useState } from 'react';
import { Project } from '@/DefinitionType';
import { ViewProject } from '../Molecules/ViewProject';
import { ViewTask } from '../Molecules/ViewTask';
import { ViewCreateTask } from '../Molecules/ViewCreateTask';
import { StyledButton } from '../Styled';

// import { FC } from 'react';

export const OneProjectCalender: FC<{
  project: Project;
  DayList: string[];
}> = ({ project, DayList }) => {
  const [addTaskFlag, setAddTaskFlag] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [ViewTaskFlag, setViewTaskFlag] = useState(false);
  return (
    <Grid>
      {/* <CreateProjectForm
        DayList={DayList}
        project={project}
        addProjectFlag={addProjectFlag}
        setAddProjectFlag={setAddProjectFlag}
        newProject={newProject}
        setNewProject={setNewProject}
      /> */}
      <ViewProject project={project} DayList={DayList} />
      <StyledButton
        sx={{
          display: ViewTaskFlag ? 'none' : '',
        }}
        onClick={() => {
          setViewTaskFlag(true);
        }}
      >
        show▼
      </StyledButton>
      <Grid
        sx={{
          display: ViewTaskFlag ? '' : 'none',
        }}
      >
        <ViewTask project={project} DayList={DayList} />
        <ViewCreateTask
          DayList={DayList}
          project={project}
          addTaskFlag={addTaskFlag}
          setAddTaskFlag={setAddTaskFlag}
          newTask={newTask}
          setNewTask={setNewTask}
        />
      </Grid>
      <StyledButton
        sx={{
          display: ViewTaskFlag ? '' : 'none',
        }}
        onClick={() => {
          setViewTaskFlag(false);
        }}
      >
        hide▲
      </StyledButton>
    </Grid>
  );
};
