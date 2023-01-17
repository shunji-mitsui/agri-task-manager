import {
  Button,
  Card,
  Grid,
  // ListItemIcon,
  // ListItemText,
  // MenuItem,
  // MenuList,
  styled,
  TextField,
  Typography,
} from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { createField, deleteField, updateField } from './FunctionForField';

export const StyledArea = styled(Card)(`
  
  width:400px;
  padding-right:10px;
  margin-right:10px;
  text-align:center;
  background-color:#F9F7F5;

`);

export const StyledField = styled(Grid)(`
  width:500px;
  padding-left:10px;
  margin-bottom:10px;
  padding-bottom:10px;
`);

const UpDateFieldForm: FC<{ id: string; name: string }> = ({ id, name }) => {
  const [changeFieldName, setChangeFieldName] = useState(true);
  const [updatedFieldName, setName] = useState('');

  return (
    <Grid>
      <Grid
        xs={2}
        className={changeFieldName ? '' : 'display-none'}
        onClick={() => setChangeFieldName(false)}
      >
        {name}
      </Grid>
      <Grid xs={2} className={changeFieldName ? 'display-none' : ''}>
        <TextField
          type="text"
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Button
          variant="outlined"
          onClick={() => {
            setChangeFieldName(true);
            updateField(id, updatedFieldName);
          }}
        >
          更新
        </Button>
      </Grid>
    </Grid>
  );
};

export const EditArea = () => {
  const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  const [field, setField] = useState([{ field: '', id: '', color: '' }]);
  const [appearCreateField, setAppearCreateField] = useState(false);
  const [fieldName, setFieldName] = useState('');
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/field/get').then((res) => {
      setField(res.data);
      console.log(res.data);
    });
  }, []);
  const view = field.map((f, key) => {
    return (
      <Grid key={key} item direction="column">
        <StyledArea>
          <StyledField
            sx={{
              color: f.color,
            }}
          >
            <UpDateFieldForm id={f.id} name={f.field} />
            {/* {f.color} */}
            <Grid item>
              <StyledButton variant="outlined">編集</StyledButton>
              <StyledButton
                variant="outlined"
                onClick={() => deleteField(f.id)}
              >
                削除
              </StyledButton>
            </Grid>
          </StyledField>
        </StyledArea>
      </Grid>
    );
  });
  return (
    <div>
      <Typography>エリアの編集画面</Typography>
      <StyledButton
        variant="outlined"
        onClick={() => {
          setAppearCreateField(true);
        }}
        className={appearCreateField ? 'display-none' : ''}
      >
        エリアの追加
      </StyledButton>
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
    </div>
  );
};

const StyledButton = styled(Button)`
  padding: 0.5rem;
  margin: 0.5rem;
  color: #444444;
`;

// const StyledHeader = styled(div)`
//   padding: 1rem;
// `;
