import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  // ListItemIcon,
  // ListItemText,
  // MenuItem,
  // MenuList,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import Item from '@mui/'

import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { createField, deleteField, updateField } from './FunctionForField';

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
  const [field, setField] = useState([{ field: '', id: '' }]);
  const [appearCreateField, setAppearCreateField] = useState(false);
  const [fieldName, setFieldName] = useState('');
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/field/get').then((res) => {
      setField(res.data);
    });
  }, []);
  const [expanded, setExpanded] = useState<string | false>(false);
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const view = field.map((f, key) => {
    return (
      <Grid key={key} container rowGap={2} direction="column">
        <Grid>
          <UpDateFieldForm id={f.id} name={f.field} />
        </Grid>
        <Grid item>
          <Accordion
            expanded={expanded === 'panel1'}
            onChange={handleChange('panel1')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                <StyledButton variant="outlined">メニュー</StyledButton>
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                削除や編集を行うにはクリックしてください
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <StyledButton variant="outlined">編集</StyledButton>
              <StyledButton
                variant="outlined"
                onClick={() => deleteField(f.id)}
              >
                削除
              </StyledButton>
            </AccordionDetails>
          </Accordion>
        </Grid>
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
            createField(fieldName);
          }}
        >
          送信
        </button>
      </div>
      {view}
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
