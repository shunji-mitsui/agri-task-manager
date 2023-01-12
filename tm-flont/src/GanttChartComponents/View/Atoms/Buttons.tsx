import { deleteProject } from '../..//Functions/Project';
import { Button } from '@mui/material';
import { FC } from 'react';

export const DeleteButton: FC<{
  id: string;
  setRender: (value: boolean) => void;
  render: boolean;
}> = ({ id, setRender, render }) => {
  return (
    <Button
      variant="outlined"
      onClick={() => {
        deleteProject(id);
        setRender(!render);
      }}
    >
      削除
    </Button>
  );
};

export const AddButton = () => {
  return (
    <Button
      onClick={() => {
        console.log('hoge');
      }}
    >
      タスク追加
    </Button>
  );
};
