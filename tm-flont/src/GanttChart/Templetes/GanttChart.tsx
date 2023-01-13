import { Grid } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { getField } from '../Functions';
import { Headline } from '../Molecules/Headline';
import { ViewField } from './SideBar';
import { Field } from '../Typed';

export const GanttChart = () => {
  const [field, setField] = useState<Field[]>([
    { id: '', field: '', color: '' },
  ]);
  const [clickCount, setClickCount] = useState(0);

  const DayList = [...Array(50)].map((_, i) =>
    dayjs()
      .add(clickCount * 10, 'd')
      .add(i, 'd')
      .format('YYYY-MM-DD'),
  );

  useEffect(() => {
    getField(setField);
  }, []);

  return (
    <Grid>
      <Headline
        DayList={DayList}
        clickCount={clickCount}
        setClickCount={setClickCount}
      />

      <ViewField field={field} DayList={DayList} />
    </Grid>
  );
};
