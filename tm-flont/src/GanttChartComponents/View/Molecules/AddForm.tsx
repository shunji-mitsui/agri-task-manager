import axios from 'axios';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { FC, useContext, useState } from 'react';
import { RenderContext } from '../../Functions/UseContext';
// import { ViewTaskList } from './ViewTask';
import { Grid, styled } from '@mui/material';
// import { ViewTaskList } from './ViewTask';

dayjs.extend(isBetween);

const StyledDay = styled(Grid)(`
  color: grey;
  width:30px;
  padding-left:10px;
  border: solid 1px black;
`);

// const onClickAction = () => {
//   if (!select[0]) {
//     const selectDay = [day];
//     setSelect(selectDay);
//     setSelectedFlag(true);
//   } else {
//     // const firstSelect = select[0];
//     setSelectedFlag(true);
//     const selectDays = select;
//     selectDays.push(day);
//     setSelect(selectDays);
//     const item = window.prompt('野菜を入力');
//     if (item) {
//       axios
//         .post('http://127.0.0.1:8000/project/post', {
//           start: select[0],
//           end: select[1],
//           item: item,
//           fieldId: field,
//         })
//         .then((res) => {
//           if (res.data.status == 100) {
//             alert('同一エリア内での期間が重複しています。');
//           }
//           setRender(!render);
//           console.log(res.data);
//           setFlag(!flag);
//           setSelect(['']);
//         });
//     } else {
//       setSelect(['']);
//     }
//     setSelectedFlag(false);
//   }
// };

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
  let color = 'white';
  if (selectedFlag) {
    color = 'red';
  } else {
    color = 'blue';
  }
  return (
    <Grid
      sx={{
        color: color,
      }}
      item
    >
      <div
        onClick={() => {
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
                .post('http://127.0.0.1:8000/project/post', {
                  start: select[0],
                  end: select[1],
                  item: item,
                  fieldId: field,
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
  );
};

export const AddForm: FC<{
  DayList: string[];
  field: string;
  flag: boolean;
  setFlag: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ DayList, field, flag, setFlag }) => {
  const [select, setSelect] = useState(['']);
  const [selectedFlag, setSelectedFlag] = useState(false);
  // console.log(select);
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
