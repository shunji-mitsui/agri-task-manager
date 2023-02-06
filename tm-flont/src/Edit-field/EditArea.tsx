import { defaultStateField, Field } from '../Typed';
import {
  StyledArea,
  StyledButtonForFieldEdit,
  StyledField,
  StyledInput,
} from '../Styled';
import { Button, Grid, Switch, TextField } from '@mui/material';

import { FC, useContext, useEffect, useState } from 'react';
import {
  changePermissionSameTerm,
  createField,
  deleteField,
  getField,
  updateField,
} from '../Functions';
import { ImSpinner6 } from 'react-icons/im';
import { RenderContext, useRender } from '../UseContext';

const UpDateFieldForm: FC<{
  id: string;
  name: string;
  setUpdateFieldNameFlag: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ id, name, setUpdateFieldNameFlag }) => {
  // const [changeFieldName, setChangeFieldName] = useState(true);
  const [updatedFieldName, setName] = useState('');
  const render = useContext(RenderContext);

  return (
    <Grid>
      <Grid>
        <StyledInput type="text" onChange={(e) => setName(e.target.value)} />
        <Button
          variant="outlined"
          onClick={() => {
            setUpdateFieldNameFlag(false);
            updateField(id, updatedFieldName);
            render.setIsRender(!render.render);
          }}
        >
          更新
        </Button>
      </Grid>
    </Grid>
  );
};

export const OneArea: FC<{ field: Field }> = ({ field }) => {
  const [allowFlag, setAllowFlag] = useState<boolean>(field.permission);
  const [updateFieldNameFlag, setUpdateFieldNameFlag] =
    useState<boolean>(false);

  const render = useContext(RenderContext);

  return (
    <Grid>
      <StyledArea>
        <StyledField
          sx={{
            color: field.color,
          }}
        >
          {updateFieldNameFlag ? (
            <UpDateFieldForm
              id={field.id}
              name={field.field}
              setUpdateFieldNameFlag={setUpdateFieldNameFlag}
            />
          ) : (
            field.field
          )}
          <Grid item>
            期間重複
            <Switch
              checked={allowFlag}
              onChange={() => {
                setAllowFlag(!allowFlag);
                changePermissionSameTerm(field.id, !allowFlag);
                render.setIsRender(!render.render);
              }}
            />
            <StyledButtonForFieldEdit
              variant="outlined"
              onClick={() => {
                setUpdateFieldNameFlag(true);
              }}
            >
              編集
            </StyledButtonForFieldEdit>
            <StyledButtonForFieldEdit
              variant="outlined"
              onClick={() => {
                deleteField(field.id);
                render.setIsRender(!render.render);
              }}
            >
              削除
            </StyledButtonForFieldEdit>
          </Grid>
        </StyledField>
      </StyledArea>
    </Grid>
  );
};

export const EditArea = () => {
  const [viewFlag, setViewFlag] = useState(false);
  const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  const [field, setField] = useState<Field[]>(defaultStateField);
  const [appearCreateField, setAppearCreateField] = useState(false);
  const [fieldName, setFieldName] = useState('');
  const renderContext = useRender();
  useEffect(() => {
    getField(setField);
    setTimeout(() => {
      setViewFlag(true);
    }, 500);
  }, []);
  useEffect(() => {
    getField(setField);
    setTimeout(() => {
      setViewFlag(true);
    }, 500);
  }, [renderContext.render]);
  const view = field.map((f, key) => {
    return (
      <Grid key={key} item direction="column">
        <OneArea field={f} />
      </Grid>
    );
  });
  return (
    <div>
      {viewFlag ? (
        <>
          <StyledButtonForFieldEdit
            variant="outlined"
            onClick={() => {
              setAppearCreateField(true);
            }}
            className={appearCreateField ? 'display-none' : ''}
          >
            エリアの追加
          </StyledButtonForFieldEdit>
          <div className={appearCreateField ? '' : 'display-none'}>
            <TextField onChange={(e) => setFieldName(e.target.value)} />
            <button
              onClick={() => {
                setAppearCreateField(false);
                createField(fieldName, randomColor);
              }}
            >
              送信
            </button>
          </div>
          <Grid container>{view}</Grid>
        </>
      ) : (
        <>
          <ImSpinner6 className="spinner" />
        </>
      )}
    </div>
  );
};
