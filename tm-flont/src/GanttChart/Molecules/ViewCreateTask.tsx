import { Project } from '../../DefinitionType';
import { Button, Grid } from '@mui/material';
import { FC } from 'react';
import { StyledInput, StyledSideBar } from '../Styled';
import { AddTaskForm } from './Molecules';

export const ViewCreateTask: FC<{
  DayList: string[];
  project: Project;
  addTaskFlag: boolean;
  setAddTaskFlag: React.Dispatch<React.SetStateAction<boolean>>;
  newTask: string;
  setNewTask: React.Dispatch<React.SetStateAction<string>>;
}> = ({
  DayList,
  project,
  addTaskFlag,
  setAddTaskFlag,
  newTask,
  setNewTask,
}) => {
  return (
    <Grid container>
      <StyledSideBar item>
        <Button
          onClick={() => {
            setAddTaskFlag(true);
          }}
          sx={{
            display: addTaskFlag ? 'none' : '',
          }}
        >
          タスク
        </Button>
        <Grid
          item
          sx={{
            display: addTaskFlag ? '' : 'none',
          }}
        >
          <StyledInput
            type="text"
            onChange={(e) => setNewTask(e.target.value)}
          />
        </Grid>
      </StyledSideBar>
      <Grid
        item
        sx={{
          display: addTaskFlag ? '' : 'none',
        }}
      >
        <AddTaskForm id={project.id} DayList={DayList} newTask={newTask} />
      </Grid>
    </Grid>
  );
};

// function setAddTaskFlag(arg0: boolean) {
//   throw new Error("Function not implemented.");
// }

// function setAddTaskFlag(arg0: boolean) {
//   throw new Error("Function not implemented.");
// }
