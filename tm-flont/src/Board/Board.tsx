import { Button, Grid } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { Task } from '@mui/icons-material';
import { deleteTask } from '../GanttChart/Functions';
import { StyledBoard, StyledTicket, StyledTitle } from './Styled';
// import { blue } from '@mui/material/colors';

const ViewTaskContent: FC<{
  task: {
    id: string;
    parentProject: string;
    date: string;
    task: string;
    color: string;
  };
}> = ({ task }) => {
  return (
    <StyledTicket>
      <Grid
        sx={{
          bgcolor: task.color,
          boxShadow: 1,
          color: 'white',
        }}
      >
        {' '}
        {task.task}
      </Grid>
      <Grid sx={{ color: '#828282' }}>{task.date}</Grid>
      <Grid sx={{ color: '#828282' }}>{task.parentProject}</Grid>

      <Button
        sx={{
          color: task.color,
        }}
        onClick={() => {
          deleteTask(task.id);
        }}
      >
        <Task />
      </Button>
    </StyledTicket>
  );
};

const ListTicket: FC<{
  task: {
    id: string;
    parentProject: string;
    date: string;
    task: string;
    color: string;
  }[];
}> = ({ task }) => {
  const view = task.map((t, key) => {
    return (
      <Grid
        key={key}
        sx={{
          color: t.color,
        }}
      >
        <ViewTaskContent task={t} />
      </Grid>
    );
  });

  return <Grid>{view}</Grid>;
};

const ListTask: FC<{
  task: {
    status: string;
    task: {
      id: string;
      parentProject: string;
      date: string;
      task: string;
      color: string;
    }[];
  }[];
}> = ({ task }) => {
  const view = task.map((t, key) => {
    return (
      <Grid item key={key}>
        <StyledBoard sx={{ minHeight: 500 }}>
          <StyledTitle>{t.status}</StyledTitle>
          <ListTicket task={t.task} />
        </StyledBoard>
      </Grid>
    );
  });
  return <Grid container>{view}</Grid>;
};

export const Board = () => {
  const [task, setTask] = useState([
    {
      status: '',
      task: [
        {
          color: '',
          id: '',
          task: '',
          date: '',
          parentProject: '',
        },
      ],
    },
  ]);
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/board/get').then((res) => {
      console.log(res.data);
      setTask(res.data);
    });
  }, []);

  return (
    <Grid>
      <ListTask task={task} />
    </Grid>
  );
};
