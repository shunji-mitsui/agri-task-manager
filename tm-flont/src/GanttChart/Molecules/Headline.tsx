import { Button, Grid } from '@mui/material';
import { FC } from 'react';
import { StyledDay, StyledSideBar } from '../Styled';

export const HeadLineCalender: FC<{ DayList: string[] }> = ({ DayList }) => {
  const ViewDay = DayList.map((d, key) => {
    return (
      <div key={key}>
        <StyledDay item>{d.slice(-2)}</StyledDay>
      </div>
    );
  });
  const ViewMonth = DayList.map((d, key) => {
    return (
      <div key={key}>
        <StyledDay item>{d.slice(5, 7)}</StyledDay>
      </div>
    );
  });

  return (
    <Grid>
      <Grid container> {ViewMonth}</Grid>
      <Grid container>{ViewDay}</Grid>
    </Grid>
  );
};

export const Headline: FC<{
  DayList: string[];
  clickCount: number;
  setClickCount: React.Dispatch<React.SetStateAction<number>>;
}> = ({ DayList, clickCount, setClickCount }) => {
  return (
    <Grid container>
      <StyledSideBar>
        日付
        <Button onClick={() => setClickCount(clickCount - 1)}>◁</Button>
      </StyledSideBar>
      <Grid item>
        <HeadLineCalender DayList={DayList} />
      </Grid>
      <Button onClick={() => setClickCount(clickCount + 1)}>▷</Button>
    </Grid>
  );
};
