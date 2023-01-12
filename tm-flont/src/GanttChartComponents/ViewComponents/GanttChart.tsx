import { FProject } from '@/DefinitionType';
import dayjs from 'dayjs';
import { Button } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { getProject } from '../FunctionsForGanttChart/FunctionForProject';
import { RenderContext } from '../FunctionsForGanttChart/UseContext';
import { ViewGanttBar } from './GanttBar';
import { HeadlineGanttChart } from './HeadLine';
import { AddForm } from './Milestone';
import { ProjectSidebar } from './Sidebar';

const ViewProjectByField: FC<{ project: FProject }> = ({ project }) => {
  const dayList = [...Array(60)].map((_, i) =>
    dayjs().add(i, 'd').format('YYYY-MM-DD'),
  );
  const [flag, setFlag] = useState(false);
  return (
    <div>
      <div className="GanttBar">
        <div className="SideBar AllView">
          <div className="color">{project.field}</div>
          <Button
            onClick={() => setFlag(!flag)}
            className={flag ? 'display-none' : ''}
          >
            新規作成
          </Button>
          <ProjectSidebar project={project.project} />
        </div>
        <div>
          <div className={flag ? '' : 'display-none'}>
            <AddForm
              DayList={dayList}
              field={project.field}
              flag={flag}
              setFlag={setFlag}
            />
          </div>
          <ViewGanttBar
            project={project.project}
            DayList={dayList}
            flag={flag}
          />
        </div>
      </div>
    </div>
  );
};

const MainGanttchart: FC<{ projectList: FProject[] }> = ({ projectList }) => {
  console.log(projectList, 'iiiiiiiiiiiii');
  const ViewField = projectList.map((p, key) => {
    return (
      <div key={key}>
        <ViewProjectByField project={p} />
      </div>
    );
  });
  return <div>{ViewField}</div>;
};

export const ViewGanttChart = () => {
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
        <HeadlineGanttChart />
        <MainGanttchart projectList={viewProject} />
      </RenderContext.Provider>
    </div>
  );
};
