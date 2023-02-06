import { StyledDay } from '../../Styled';
import { TypeDay } from '../../Typed';
import { FC } from 'react';

const monthColor = (day: string) => {
  const color: string =
    day == '01'
      ? '#d94325'
      : day == '02'
      ? 'primary.main'
      : day == '03'
      ? '#e77575'
      : day == '04'
      ? '#82b226'
      : day == '05'
      ? '#0ba19a'
      : day == '06'
      ? '#9a3f8b'
      : day == '07'
      ? '#34a0da'
      : day == '08'
      ? '#e2851a'
      : day == '09'
      ? '#396c29'
      : day == '10'
      ? '#a3790b'
      : day == '11'
      ? '#9d6849'
      : day == '12'
      ? '#484c96'
      : '';
  return color;
};

export const ViewMonth: FC<{ DayList: TypeDay[] }> = ({ DayList }) => {
  const view = DayList.map((d, key) => {
    const color = monthColor(d.date.slice(5, 7));
    return (
      <div key={key}>
        <StyledDay
          sx={{
            bgcolor: color,
            opacity: 100,
          }}
          item
        >
          {d.date.slice(5, 7)}
        </StyledDay>
      </div>
    );
  });

  return <>{view}</>;
};
