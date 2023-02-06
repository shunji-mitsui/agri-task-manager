import { TypeDay } from '../../Typed';
import { Button, Grid } from '@mui/material';
import { FC } from 'react';
import { StyledSideBar } from '../../Styled';
import { ViewMonth } from '../Molecules/ViewMonth';
import { ViewDay } from '../Molecules/ViewDay';
const HeadLineCalender: FC<{
  DayList: TypeDay[];
}> = ({ DayList }) => {
  return (
    <Grid>
      <Grid container>
        <ViewMonth DayList={DayList} />
      </Grid>
      <Grid container>
        <ViewDay DayList={DayList} />
      </Grid>
    </Grid>
  );
};

export const Headline: FC<{
  DayList: TypeDay[];
  clickCount: number;
  setClickCount: React.Dispatch<React.SetStateAction<number>>;
}> = ({ DayList, clickCount, setClickCount }) => {
  return (
    <Grid>
      <Grid container>
        <StyledSideBar></StyledSideBar>
        <StyledSideBar></StyledSideBar>
        <StyledSideBar></StyledSideBar>
        <Button onClick={() => setClickCount(clickCount - 1)}>◁</Button>
        <Button onClick={() => setClickCount(0)}>
          {DayList[0].date.slice(0, 4)}年
        </Button>
        <Button onClick={() => setClickCount(clickCount + 1)}>▷</Button>
      </Grid>
      <Grid container>
        {/* <StyledSideBar></StyledSideBar> */}
        <Grid
          sx={{
            paddingLeft: 12.5,
          }}
        >
          <HeadLineCalender DayList={DayList} />
        </Grid>
      </Grid>
    </Grid>
  );
};
