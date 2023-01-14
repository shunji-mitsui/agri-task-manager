import { Project } from '@/DefinitionType';
// import { RenderContext } from '../../s/Functions/UseContext';
import { Button, Grid } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { getProject, postProject } from '../Functions';
import { defaultStateProject, Field } from '../Typed';
import { OneProjectCalender } from '../Organisms/OneProjectCalender';
import { StyledDay, StyledInput, StyledSideBar } from '../Styled';

const ViewProject: FC<{ field: Field; DayList: string[] }> = ({
  field,
  DayList,
}) => {
  const [project, setProject] = useState<Project[]>(defaultStateProject);

  useEffect(() => {
    getProject(setProject, field.id);
  }, []);

  const view = project.map((p, key) => {
    return (
      <Grid key={key}>
        <OneProjectCalender project={p} DayList={DayList} />
      </Grid>
    );
  });

  return (
    <Grid
      sx={{
        color: field.color,
      }}
    >
      {view}
    </Grid>
  );
};

export const AddProject: FC<{
  id: string;
  DayList: string[];
  newProject: string;
  term: string[];
  setTerm: React.Dispatch<React.SetStateAction<string[]>>;
}> = ({ id, DayList, newProject, term, setTerm }) => {
  const view = DayList.map((d, key) => {
    return (
      <StyledDay
        item
        key={key}
        onClick={() => {
          if (term[0] === '') {
            setTerm([d]);
            console.log(term);
          } else {
            term.push(d);
            setTerm(term);
            console.log(term);
            postProject(id, term[0], term[1], newProject);
            setTerm(['']);
          }
        }}
      >
        ○
      </StyledDay>
    );
  });
  return <Grid container>{view}</Grid>;
};

const AddProjectForm: FC<{ field: Field; DayList: string[] }> = ({
  field,
  DayList,
}) => {
  const [addFlag, setAddFlag] = useState(false);
  const [newProject, setNewProject] = useState('');
  const [term, setTerm] = useState(['']);

  return (
    <Grid container>
      <StyledSideBar item>
        <Button
          onClick={() => {
            setAddFlag(true);
          }}
          sx={{
            display: addFlag ? 'none' : '',
          }}
        >
          新規
        </Button>
        <Grid
          item
          sx={{
            display: addFlag ? '' : 'none',
          }}
        >
          <StyledInput
            type="text"
            onChange={(e) => setNewProject(e.target.value)}
          />
        </Grid>
      </StyledSideBar>
      <Grid
        item
        sx={{
          display: addFlag ? '' : 'none',
        }}
      >
        <AddProject
          id={field.id}
          DayList={DayList}
          newProject={newProject}
          term={term}
          setTerm={setTerm}
        />
      </Grid>
    </Grid>
  );
};

export const ViewField: FC<{ field: Field[]; DayList: string[] }> = ({
  field,
  DayList,
}) => {
  const view = field.map((f, key) => {
    return (
      <Grid key={key} container>
        <Grid item>
          <Grid>
            <Grid>{f.field}</Grid>
          </Grid>
        </Grid>
        <Grid item>
          <AddProjectForm field={f} DayList={DayList} />
          <ViewProject field={f} DayList={DayList} />
        </Grid>
      </Grid>
    );
  });
  return <Grid>{view}</Grid>;
};
