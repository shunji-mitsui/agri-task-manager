import axios from 'axios';
import { Project } from '@/DefinitionType';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { FC, useContext, useState } from 'react';
import { RenderContext } from '../Function/UseContext';
import { IsOnTerm } from '../Function/Project';
import { ViewTaskList } from './ViewTask';
import { Grid, styled } from '@mui/material';

dayjs.extend(isBetween);

const StyledDay = styled(Grid)(`
  color: grey;
  width:30px;
  padding-left:10px;
  border: solid 1px black;
`);

export const AddMileStone: FC<{
  day: string;
  select: string[];
  setSelect: React.Dispatch<React.SetStateAction<string[]>>;
  selectedFlag: boolean;
  setSelectedFlag: React.Dispatch<React.SetStateAction<boolean>>;
  field: string;
  flag: boolean;
  setFlag: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ day, select, setSelect, field, flag, setFlag }) => {
  const [selectedFlag, setSelectedFlag] = useState(false);
  const { render, setRender } = useContext(RenderContext);
  return (
    <div className={selectedFlag ? 'selected day' : 'day'}>
      <Grid item>
        <div
          onClick={(e) => {
            if (!select[0]) {
              const selectDay = [day];
              setSelect(selectDay);
              setSelectedFlag(true);
            } else {
              // const firstSelect = select[0];
              setSelectedFlag(true);
              const selectDays = select;
              selectDays.push(day);
              setSelect(selectDays);
              const item = window.prompt('野菜を入力');
              if (item) {
                axios
                  .post('http://127.0.0.1:8000/project', {
                    start: select[0],
                    end: select[1],
                    item: item,
                    field: field,
                  })
                  .then((res) => {
                    if (res.data.status == 100) {
                      alert('同一エリア内での期間が重複しています。');
                    }
                    setRender(!render);
                    console.log(res.data);
                    setFlag(!flag);
                    setSelect(['']);
                  });
              } else {
                setSelect(['']);
              }
              setSelectedFlag(false);
            }
          }}
        >
          -
        </div>
      </Grid>
    </div>
  );
};

export const AddForm: FC<{
  DayList: string[];
  field: string;
  flag: boolean;
  setFlag: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ DayList, field, flag, setFlag }) => {
  // console.log(DayList,'uuuuuuuuuuu')
  const [select, setSelect] = useState(['']);
  const [selectedFlag, setSelectedFlag] = useState(false);
  console.log(select);
  const ViewAddForm = DayList.map((d, key) => {
    return (
      <div key={key}>
        <StyledDay>
          <AddMileStone
            day={d}
            select={select}
            setSelect={setSelect}
            selectedFlag={selectedFlag}
            setSelectedFlag={setSelectedFlag}
            field={field}
            flag={flag}
            setFlag={setFlag}
          />
        </StyledDay>
      </div>
    );
  });
  return (
    <div className="AllView">
      <Grid container>{ViewAddForm}</Grid>
    </div>
  );
};

export const Milestone: FC<{
  day: string;
  project: Project;
}> = ({ day, project }) => {
  const { render, setRender } = useContext(RenderContext);
  const useFlag = IsOnTerm(project, day, render, setRender).flag;
  const content = IsOnTerm(project, day, render, setRender).content;
  const func = IsOnTerm(project, day, render, setRender).func;
  // const target = IsOnTerm(project, day, render, setRender).target;s
  let task: any;
  if (useFlag) {
    task = (
      <div>
        <ViewTaskList project={project} day={day} />
      </div>
    );
  }
  return (
    <Grid item>
      <div
        className={useFlag ? 'Istrue' : ''}
        onClick={() => {
          func();
        }}
      >
        {content}
        {task}
      </div>
    </Grid>
  );
};
