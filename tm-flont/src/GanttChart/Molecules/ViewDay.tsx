import { StyledDay } from '../../Styled';
import { TypeDay } from '../../Typed';
import { FC } from 'react';

export const ViewDay: FC<{ DayList: TypeDay[] }> = ({ DayList }) => {
  const view = DayList.map((d, key) => {
    const color = d.day == 0 ? 'red' : d.day == 6 ? 'blue' : 'black';
    return (
      <div key={key}>
        <StyledDay
          sx={{
            color: color,
          }}
          item
        >
          {d.date.slice(-2)}
        </StyledDay>
      </div>
    );
  });
  return <>{view}</>;
};
