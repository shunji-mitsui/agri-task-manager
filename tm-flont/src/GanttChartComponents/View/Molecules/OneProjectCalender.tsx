import { Project, Task } from '@/DefinitionType';
import {
  FlagContext,
  GanttBarContext,
  RenderContext,
} from '../../Functions/UseContext';
import { Grid, styled } from '@mui/material';
import { FC, useContext, useState } from 'react';
import { Milestone } from '../Atoms/Milestone';
import axios from 'axios';
// import { StyledDay } from '../Styled/StyledComponent';

export const StyledDay = styled(Grid)(`
  color: grey;
  width:30px;
  padding-left:10px;
  border: solid 1px black;
`);

const ViewDay: FC<{
  isChangeMode: boolean;
  setIsChangeMode: React.Dispatch<React.SetStateAction<boolean>>;
  isCreateMode: boolean;
  setIsCreateMode: React.Dispatch<React.SetStateAction<boolean>>;
  target: string;
  setTarget: React.Dispatch<React.SetStateAction<string>>;
  afterDay: string;
  setAfterDay: React.Dispatch<React.SetStateAction<string>>;
  flag: boolean;
  p: Project;
  d: string;
}> = ({
  isChangeMode,
  setIsChangeMode,
  isCreateMode,
  setIsCreateMode,
  target,
  setTarget,
  afterDay,
  setAfterDay,
  p,
  d,
}) => {
  const [onTerm, setOnTerm] = useState(false);
  // console.log('(カレンダー作成コンポーネント',p)
  return (
    <FlagContext.Provider value={{ onTerm, setOnTerm }}>
      <GanttBarContext.Provider
        value={{
          isChangeMode,
          setIsChangeMode,
          isCreateMode,
          setIsCreateMode,
          target,
          setTarget,
          afterDay,
          setAfterDay,
        }}
      >
        <Milestone project={p} day={d} />
      </GanttBarContext.Provider>
    </FlagContext.Provider>
  );
};

const getTask = (
  id: string,
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>,
) => {
  axios
    .post('http://127.0.0.1:8000/task/get', {
      id: id,
    })
    .then((res) => {
      setTaskList(res.data);
    });
};

export const OneProjectCalender: FC<{
  DayList: string[];
  task: Task[];
  flag: boolean;
  project: Project;
}> = ({ DayList, task, flag, project }) => {
  const [taskList, setTaskList] = useState<Task[]>([
    { id: '', task: '', parentId: '', date: '' },
  ]);
  const { render, setRender } = useContext(RenderContext);

  const [isChangeMode, setIsChangeMode] = useState<boolean>(false);
  const [isCreateMode, setIsCreateMode] = useState<boolean>(false);
  const [target, setTarget] = useState<string>('');
  const [afterDay, setAfterDay] = useState<string>('');

  const view = DayList.map((d, key) => {
    return (
      <Grid item key={key}>
        <StyledDay>
          <ViewDay
            isChangeMode={isChangeMode}
            setIsChangeMode={setIsChangeMode}
            isCreateMode={isCreateMode}
            setIsCreateMode={setIsCreateMode}
            target={target}
            setTarget={setTarget}
            afterDay={afterDay}
            setAfterDay={setAfterDay}
            flag={flag}
            p={project}
            d={d}
          />
        </StyledDay>
      </Grid>
    );
  });
  return <Grid container>{view}</Grid>;
};
