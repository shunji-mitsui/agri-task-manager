import { Project } from '@/DefinitionType';
import { Grid, styled } from '@mui/material';
// import { Grid } from '@mui/material';
import { FC, useState } from 'react';
import { FlagContext, GanttBarContext } from '../Function/UseContext';
import { Milestone } from './Milestone';

const StyledDay = styled(Grid)(`
  color: grey;
  width:30px;
  padding-left:10px;
  border: solid 1px black;
`);

const ViewCalender: FC<{
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

export const ViewGanttBar: FC<{
  project: Project[];
  DayList: string[];
  flag: boolean;
}> = ({ project, DayList, flag }) => {
  const [isChangeMode, setIsChangeMode] = useState<boolean>(false);
  const [isCreateMode, setIsCreateMode] = useState<boolean>(false);
  const [target, setTarget] = useState<string>('');
  const [afterDay, setAfterDay] = useState<string>('');
  const ViewProject = project.map((p, key) => {
    let color = 'grey';
    if (p.field === '藤沢') {
      color = 'green';
    } else {
      color = 'blue';
    }
    const ViewDay = DayList.map((d, key) => {
      return (
        <Grid key={key}>
          <StyledDay
            sx={{
              color: { color },
            }}
          >
            <ViewCalender
              isChangeMode={isChangeMode}
              setIsChangeMode={setIsChangeMode}
              isCreateMode={isCreateMode}
              setIsCreateMode={setIsCreateMode}
              target={target}
              setTarget={setTarget}
              afterDay={afterDay}
              setAfterDay={setAfterDay}
              flag={flag}
              p={p}
              d={d}
            />
          </StyledDay>
        </Grid>
      );
    });
    return (
      <div key={key}>
        <Grid container>{ViewDay}</Grid>
      </div>
    );
  });
  return <div>{ViewProject}</div>;
};
