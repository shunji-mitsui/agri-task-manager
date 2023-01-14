import { Project } from '../..//DefinitionType';
import { Button, Grid } from '@mui/material';
import React, { FC } from 'react';
import { StyledDay, StyledInput, StyledSideBar } from '../Styled';

export const AddProjectForm: FC<{
  id: string;
  DayList: string[];
  newProject: string;
}> = ({ id, DayList, newProject }) => {
  const view = DayList.map((d, key) => {
    return (
      <StyledDay
        item
        key={key}
        onClick={() => {
          alert(`新しいプロジェクト:${newProject}`);
        }}
      >
        ○
      </StyledDay>
    );
  });
  return <Grid container>{view}</Grid>;
};

export const CreateProjectForm: FC<{
  DayList: string[];
  project: Project;
  addProjectFlag: boolean;
  setAddProjectFlag: React.Dispatch<React.SetStateAction<boolean>>;
  newProject: string;
  setNewProject: React.Dispatch<React.SetStateAction<string>>;
}> = ({
  DayList,
  project,
  addProjectFlag,
  setAddProjectFlag,
  newProject,
  setNewProject,
}) => {
  return (
    <Grid container>
      <StyledSideBar item>
        <Button
          onClick={() => {
            setAddProjectFlag(true);
          }}
          sx={{
            display: addProjectFlag ? 'none' : '',
          }}
        >
          新規プロジェクト
        </Button>
        <Grid
          item
          sx={{
            display: addProjectFlag ? '' : 'none',
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
          display: addProjectFlag ? '' : 'none',
        }}
      >
        <AddProjectForm
          id={project.id}
          DayList={DayList}
          newProject={newProject}
        />
      </Grid>
    </Grid>
  );
};
