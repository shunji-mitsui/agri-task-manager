import { Button } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      <div className="App">BeFarm</div>
      <div className="ButtonForPageChange">
        <Link to="/ganttchart">
          <Button>ガントチャート</Button>
        </Link>
        <Link to="/board">
          <Button>ボード画面</Button>
        </Link>
        <Link to="/edit-field">
          <Button>エリア編集</Button>
        </Link>
      </div>
      <div className="Main">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
