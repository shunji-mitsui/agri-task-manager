import { Project } from '../../Typed';
// import { updateProjectDate } from '@/GanttChartComponents/Functions/Project';
import { Grid } from '@mui/material';
import { FC, useContext, useEffect, useState } from 'react';
import { updateProjectDate } from '../../Functions';
import { StyledDay } from '../../Styled';
import '../../App.css';
import { RenderContext } from '../../UseContext';

import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

const MileStone: FC<{
  project: Project;
  day: string;
  isChangeMode: boolean;
  setIsChangeMode: React.Dispatch<React.SetStateAction<boolean>>;
  targetTitle: string;
  setTarget: React.Dispatch<React.SetStateAction<string>>;
  changeDate: string;
  setChangeDate: React.Dispatch<React.SetStateAction<string>>;
}> = ({
  project,
  day,
  isChangeMode,
  setIsChangeMode,
  targetTitle,
  setTarget,
  changeDate,
  setChangeDate,
}) => {
  const [isTarget, setIsTarget] = useState(false);
  let content = '○';
  let target = '';
  if (dayjs(day).isBetween(project.startDate, project.endDate, null, '()')) {
    content = '●';
    target = 'onTerm';
  } else if (day === project.startDate) {
    content = '●';
    target = 'start';
  } else if (day === project.endDate) {
    content = '●';
    target = 'end';
  } else {
    content = '○';
  }
  return (
    <StyledDay
      item
      onClick={() => {
        setIsTarget(true);
        if (isChangeMode) {
          setIsChangeMode(false);
          setChangeDate(day);
          console.log(target);
        } else {
          setIsChangeMode(true);
          setTarget(target);
        }
      }}
    >
      <Grid className="DayFrame">
        <div className={target}>{content}</div>
      </Grid>
    </StyledDay>
  );
};

export const GanttBar: FC<{ project: Project; DayList: string[] }> = ({
  project,
  DayList,
}) => {
  const render = useContext(RenderContext);
  const [changeDate, setChangeDate] = useState('');
  const [targetTitle, setTarget] = useState('');
  const [isChangeMode, setIsChangeMode] = useState(false);
  useEffect(() => {
    if (!isChangeMode) {
      updateProjectDate(project, targetTitle, changeDate);
      render.setIsRender(!render.render);
    }
  }, [isChangeMode]);
  const view = DayList.map((d, key) => {
    return (
      <Grid key={key}>
        <MileStone
          project={project}
          day={d}
          isChangeMode={isChangeMode}
          setIsChangeMode={setIsChangeMode}
          targetTitle={targetTitle}
          setTarget={setTarget}
          changeDate={changeDate}
          setChangeDate={setChangeDate}
        />
      </Grid>
    );
  });
  return (
    <Grid item>
      <Grid container>{view}</Grid>
    </Grid>
  );
};
