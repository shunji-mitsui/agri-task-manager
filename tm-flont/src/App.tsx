import { Button, Grid, styled } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

export const StyledTitleBar = styled(Grid)(`
  background-color:#F9F7F5;
`);
// display: addProjectFlag ? '' : 'none',
function App() {
  return (
    <div>
      <StyledTitleBar
        sx={{
          boxShadow: 1,
        }}
        className="ButtonForPageChange"
      >
        <Link to="/ganttchart/">
          <Button>ガントチャート</Button>
        </Link>
        <Link to="/edit-field/">
          <Button>エリア編集</Button>
        </Link>
      </StyledTitleBar>
      <div className="Main">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
