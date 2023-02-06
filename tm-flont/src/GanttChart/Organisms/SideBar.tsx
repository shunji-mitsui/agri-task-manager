// import { Project } from '@/DefinitionType';
// import { RenderContext } from '../../s/Functions/UseContext';
import { Grid } from '@mui/material';
import { FC, useContext, useState } from 'react';
import { postProject } from '../../Functions';
import { Field } from '../../Typed';
import { StyledDay, StyledInput, StyledSideBar } from '../../Styled';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { OneProjectCalender } from '../Molecules/ViewProject';
import { RenderContext } from '../../UseContext';
dayjs.extend(isBetween);

const ViewProject: FC<{
  field: Field;
  DayList: string[];
}> = ({ field, DayList }) => {
  const [flag, setFlag] = useState(false);
  const view = field.project
    .map((p, key) => {
      // dayjs(p.startDate).isBetween(DayList[0], DayList[DayList.length-1], null, '[]')
      if (
        dayjs(p.startDate).isBetween(
          DayList[0],
          DayList[DayList.length - 1],
          null,
          '[]',
        ) ||
        dayjs(p.endDate).isBetween(
          DayList[0],
          DayList[DayList.length - 1],
          null,
          '[]',
        )
      ) {
        return (
          <Grid key={key}>
            <OneProjectCalender project={p} DayList={DayList} />
          </Grid>
        );
      } else {
        return;
      }
    })
    .filter((p) => p);
  return (
    <Grid
      sx={{
        color: field.color,
      }}
    >
      {view}
      {flag ? (
        <Grid>
          <AddProjectForm field={field} DayList={DayList} setFlag={setFlag} />
        </Grid>
      ) : (
        <Grid
          onClick={() => {
            setFlag(true);
          }}
        >
          +
        </Grid>
      )}
    </Grid>
  );
};

const AddProject: FC<{
  id: string;
  DayList: string[];
  newProject: string;
  term: string[];
  setTerm: React.Dispatch<React.SetStateAction<string[]>>;
  setFlag: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ id, DayList, newProject, term, setTerm, setFlag }) => {
  const render = useContext(RenderContext);
  const view = DayList.map((d, key) => {
    return (
      <StyledDay
        item
        key={key}
        onClick={() => {
          if (term[0] === '') {
            setTerm([d]);
          } else {
            term.push(d);
            setTerm(term);
            const res = confirm(
              `以下のプロジェクトを追加します\n期間:${term[0]}~${term[1]}\nプロジェクト名:${newProject}`,
            );
            if (res) {
              postProject(id, term[0], term[1], newProject);
            }
            render.setIsRender(!render.render);
            setFlag(false);
            setTerm(['']);
          }
        }}
      >
        ■
      </StyledDay>
    );
  });
  return <Grid container>{view}</Grid>;
};

const AddProjectForm: FC<{
  field: Field;
  DayList: string[];
  setFlag: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ field, DayList, setFlag }) => {
  const [newProject, setNewProject] = useState('');
  const [term, setTerm] = useState(['']);

  return (
    <Grid container>
      <StyledSideBar item>
        <Grid item>
          <StyledInput
            type="text"
            onChange={(e) => setNewProject(e.target.value)}
          />
        </Grid>
      </StyledSideBar>
      <Grid item>
        <AddProject
          id={field.id}
          DayList={DayList}
          newProject={newProject}
          term={term}
          setTerm={setTerm}
          setFlag={setFlag}
        />
      </Grid>
    </Grid>
  );
};

export const Sidebar: FC<{ field: Field[]; DayList: string[] }> = ({
  field,
  DayList,
}) => {
  const view = field.map((f, key) => {
    const pjt = f.project
      .map((p) => {
        if (
          dayjs(p.startDate).isBetween(
            DayList[0],
            DayList[DayList.length - 1],
            null,
            '[]',
          ) ||
          dayjs(p.endDate).isBetween(
            DayList[0],
            DayList[DayList.length - 1],
            null,
            '[]',
          )
        ) {
          return p;
        } else {
          return;
        }
      })
      .filter((p) => p);
    return (
      <Grid key={key} container>
        <Grid item>
          <Grid
            sx={{
              bgcolor: f.color,
              boxShadow: 1,
              color: 'white',
              height: (pjt.length + 1) * 30,
              minHeight: 30,
              width: 20,
              textAlign: 'center',
            }}
          >
            <Grid>{f.field}</Grid>
          </Grid>
        </Grid>
        <Grid item>
          <ViewProject field={f} DayList={DayList} />
        </Grid>
      </Grid>
    );
  });
  return <Grid>{view}</Grid>;
};
