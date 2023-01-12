import { Button, Grid, styled } from '@mui/material';
import { FC } from 'react';

const StyledDay = styled(Grid)(`
  color: grey;
  width:30px;
  text-align:center;
  padding-left:10px;
  border: solid 1px black;
`);
const StyledSideBar = styled(Grid)(`
  width:136px;
`);
export const HeadlineGanttChart: FC<{
  DayList: string[];
  clickCount: number;
  setClickCount: React.Dispatch<React.SetStateAction<number>>;
}> = ({ DayList, clickCount, setClickCount }) => {
  const ViewDay = DayList.map((d, key) => {
    return (
      // mapで最初のhtmlタグにはkeyを渡す必要がある。(一意にするため)
      // そのためにmap関数の第２引数にkeyを受け取れるようにしてあげて
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
    <Grid container>
      <StyledSideBar item>日付</StyledSideBar>
      <Button onClick={() => setClickCount(clickCount - 1)}>◁</Button>
      <Grid item>
        <Grid container> {ViewMonth}</Grid>
        <Grid container>{ViewDay}</Grid>
      </Grid>
      <Button onClick={() => setClickCount(clickCount + 1)}>▷</Button>
    </Grid>
  );
};
