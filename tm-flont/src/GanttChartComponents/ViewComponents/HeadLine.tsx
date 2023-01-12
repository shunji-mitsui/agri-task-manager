import dayjs from 'dayjs';

export const HeadlineGanttChart = () => {
  const DayList = [...Array(60)].map((_, i) =>
    dayjs().add(i, 'd').format('YYYY-MM-DD'),
  );
  const ViewDay = DayList.map((d, key) => {
    return (
      // mapで最初のhtmlタグにはkeyを渡す必要がある。(一意にするため)
      // そのためにmap関数の第２引数にkeyを受け取れるようにしてあげて
      <div key={key}>
        <div className="day">
          <div>{d}</div>
        </div>
      </div>
    );
  });
  return (
    <div className="">
      <div className="Calender">{ViewDay}</div>
    </div>
  );
};
