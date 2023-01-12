import { FProject } from '@/DefinitionType';
import dayjs from 'dayjs';
import { Grid, styled } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { getProject } from '../Function/Project';
import { RenderContext } from '../Function/UseContext';
import { ViewGanttBar } from './GanttBar';
import { HeadlineGanttChart } from './HeadLine';
import { AddForm } from './Milestone';
import { ProjectSidebar } from './Sidebar';

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

const ViewProjectByField: FC<{ project: FProject; DayList: string[] }> = ({
  project,
  DayList,
}) => {
  const [flag, setFlag] = useState(false);
  return (
    <Grid>
      <Grid container>
        <StyledSideBar item>
          <Grid container>
            <Grid item>
              <div className="color">{project.field}</div>
              <button
                onClick={() => setFlag(!flag)}
                className={flag ? 'display-none' : ''}
              >
                New
              </button>
            </Grid>

            <Grid item>
              <ProjectSidebar project={project.project} />
            </Grid>
          </Grid>
        </StyledSideBar>
        <Grid item>
          <Grid>
            <AddForm
              DayList={DayList}
              field={project.field}
              flag={flag}
              setFlag={setFlag}
            />
          </Grid>
          <Grid>
            <ViewGanttBar
              project={project.project}
              DayList={DayList}
              flag={flag}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const MainGanttchart: FC<{ projectList: FProject[]; DayList: string[] }> = ({
  projectList,
  DayList,
}) => {
  console.log(projectList, 'iiiiiiiiiiiii');
  const ViewField = projectList.map((p, key) => {
    return (
      <div key={key}>
        <ViewProjectByField project={p} DayList={DayList} />
      </div>
    );
  });
  return <div>{ViewField}</div>;
};

export const ViewGanttChart = () => {
  const [clickCount, setClickCount] = useState(0);

  const DayList = [...Array(50)].map((_, i) =>
    dayjs()
      .add(clickCount * 10, 'd')
      .add(i, 'd')
      .format('YYYY-MM-DD'),
  );

  const [render, setRender] = useState(false);
  const [viewProject, setViewProject] = useState<FProject[]>([
    {
      field: '',
      project: [
        {
          field: '',
          id: '',
          name: '',
          startDate: '',
          endDate: '',
          task: [{ parentId: '', id: '', task: '', date: '' }],
        },
      ],
    },
  ]);
  useEffect(() => {
    getProject(setViewProject);
  }, [render]);
  return (
    <div className="GanttChart">
      <RenderContext.Provider value={{ render, setRender }}>
        <HeadlineGanttChart
          DayList={DayList}
          clickCount={clickCount}
          setClickCount={setClickCount}
        />
        <MainGanttchart projectList={viewProject} DayList={DayList} />
      </RenderContext.Provider>
    </div>
  );
};
