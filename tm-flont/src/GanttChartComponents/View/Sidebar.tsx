import { useContext, FC } from 'react';
import { Button } from '@mui/material';
import { Project } from '@/DefinitionType';
import { RenderContext } from '../Function/UseContext';
import { deleteProject } from '../Function/Project';

export const ProjectContent: FC<{
  id: string;
  content: string;
}> = ({ id, content }) => {
  const { render, setRender } = useContext(RenderContext);

  return (
    <div>
      {content}
      <Button
        variant="outlined"
        onClick={() => {
          deleteProject(id);
          setRender(!render);
        }}
      >
        削除
      </Button>
    </div>
  );
};

export const ProjectSidebar: FC<{ project: Project[] }> = ({ project }) => {
  const view = project.map((p, key) => {
    return (
      <div key={key}>
        <div className="AllView">
          <div className="SideBar">
            <ProjectContent id={p.id} content={p.name} />
          </div>
        </div>
      </div>
    );
  });
  return <div>{view}</div>;
};
