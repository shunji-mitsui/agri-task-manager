import { Grid } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { getField } from '../../Functions';
import { Headline } from '../Organisms/Headline';
import { Sidebar } from '../Organisms/SideBar';
import { Field, defaultStateField } from '../../Typed';
import { ImSpinner6 } from 'react-icons/im';
import '../../App.css';
import {
  FieldContext,
  IsLoadContext,
  RenderContext,
  useField,
  useLoad,
  useRender,
} from '../../UseContext';

export const GanttChart = () => {
  const [field, setField] = useState<Field[]>(defaultStateField);
  const [clickCount, setClickCount] = useState(0);
  const number = Math.floor((window.innerWidth - 300) / 30);
  const [viewFlag, setViewFlag] = useState(false);

  const DayList = [...Array(number)].map((_, i) =>
    dayjs()
      .add(clickCount * 10, 'd')
      .add(i, 'd')
      .format('YYYY-MM-DD'),
  );
  const DayListWithDate = [...Array(number)].map((_, i) => {
    return {
      day: dayjs()
        .add(clickCount * 10, 'd')
        .add(i, 'd')
        .day(),
      date: dayjs()
        .add(clickCount * 10, 'd')
        .add(i, 'd')
        .format('YYYY-MM-DD'),
    };
  });
  const ctx = useLoad();
  const renderContext = useRender();
  const fieldContext = useField();
  useEffect(() => {
    getField(setField);
    setTimeout(() => {
      setViewFlag(true);
    }, 500);
  }, []);
  useEffect(() => {
    getField(setField);
    console.log('field', field);
    setTimeout(() => {
      getField(setField);
    }, 500);
  }, [renderContext.render]);

  return (
    <Grid>
      {viewFlag ? (
        <Grid>
          <Headline
            DayList={DayListWithDate}
            clickCount={clickCount}
            setClickCount={setClickCount}
          />
          <FieldContext.Provider value={fieldContext}>
            <RenderContext.Provider value={renderContext}>
              <IsLoadContext.Provider value={ctx}>
                <Sidebar field={field} DayList={DayList} />
              </IsLoadContext.Provider>
            </RenderContext.Provider>
          </FieldContext.Provider>
        </Grid>
      ) : (
        <div>
          <ImSpinner6 className="spinner" />
        </div>
      )}
    </Grid>
  );
};
