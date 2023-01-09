import React from "react";
import dayjs from "dayjs";

export const Headline_GanttChart = () => {
  const DayList = [...Array(60)].map((_, i) =>
    dayjs().add(i, "d").format("YYYY-MM-DD")
  );
  const ViewDay = DayList.map((d) => {
    return (
      <div>
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
