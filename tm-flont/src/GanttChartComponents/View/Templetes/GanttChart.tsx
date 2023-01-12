import { Project } from '@/DefinitionType';
import dayjs from 'dayjs';
import { Grid, styled } from '@mui/material';
import { FC, useContext, useEffect, useState } from 'react';
// import { getProject } from '../Function/Project';
import { RenderContext } from '../../Functions/UseContext';
import { ViewGanttBar } from '../Organisms/GanttBar';
import { AddForm } from '../Molecules/AddForm';
import { ProjectSidebar } from '../Organisms/Sidebar';
import { HeadlineGanttChart } from '../Molecules/HeadLine';
import axios from 'axios';
const getPROject = (
  setProject: React.Dispatch<React.SetStateAction<Project[]>>,
  field: Field,
) => {
  axios
    .post('http://127.0.0.1:8000/project/get', {
      id: field.id,
    })
    .then((res) => {
      setProject(res.data);
    });
};

const getField = (
  setField: React.Dispatch<
    React.SetStateAction<
      {
        id: string;
        field: string;
        color: string;
      }[]
    >
  >,
) => {
  axios.get('http://127.0.0.1:8000/field/get').then((res) => {
    setField(res.data);
  });
};
const StyledSideBar = styled(Grid)(`
  width:200px;
`);

const StyledDay = styled(Grid)(`
  color: grey;
  width:30px;
  text-align:center;
  padding-left:10px;
  border: solid 1px black;
`);

const ViewProjectByField: FC<{ field: Field; DayList: string[] }> = ({
  field,
  DayList,
}) => {
  const [flag, setFlag] = useState(false);

  const [project, setProject] = useState<Project[]>([
    {
      field: '',
      id: '',
      name: '',
      startDate: '',
      endDate: '',
      task: [
        {
          parentId: '',
          date: '',
          id: '',
          task: '',
        },
      ],
    },
  ]);
  const { render, setRender } = useContext(RenderContext);

  useEffect(() => {
    getPROject(setProject, field);
  }, [render]);
  return (
    <Grid>
      <Grid container>
        <StyledSideBar item>
          <Grid container>
            <Grid item>{field.field}</Grid>
            <Grid item>
              <ProjectSidebar project={project} />
            </Grid>
          </Grid>
        </StyledSideBar>
        <Grid item>
          <Grid>
            <AddForm
              DayList={DayList}
              field={field.id}
              flag={flag}
              setFlag={setFlag}
            />
          </Grid>
          <Grid>
            <ViewGanttBar project={project} DayList={DayList} flag={flag} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

interface Field {
  field: string;
  id: string;
  color: string;
}

const MainGanttchart: FC<{ fieldList: Field[]; DayList: string[] }> = ({
  fieldList,
  DayList,
}) => {
  const ViewField = fieldList.map((f, key) => {
    return (
      <Grid
        key={key}
        sx={{
          color: f.color,
        }}
      >
        <ViewProjectByField field={f} DayList={DayList} />
      </Grid>
    );
  });
  return <div>{ViewField}</div>;
};

export const ViewGanttChart = () => {
  const [field, setField] = useState([{ id: '', field: '', color: '' }]);
  const [clickCount, setClickCount] = useState(0);

  const DayList = [...Array(50)].map((_, i) =>
    dayjs()
      .add(clickCount * 10, 'd')
      .add(i, 'd')
      .format('YYYY-MM-DD'),
  );

  const [render, setRender] = useState(false);

  useEffect(() => {
    getField(setField);
  }, [render]);
  return (
    <div className="GanttChart">
      <RenderContext.Provider value={{ render, setRender }}>
        <HeadlineGanttChart
          DayList={DayList}
          clickCount={clickCount}
          setClickCount={setClickCount}
        />
        <MainGanttchart fieldList={field} DayList={DayList} />
      </RenderContext.Provider>
    </div>
  );
};
