import { Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      <div className="App">BeFarm</div>
      <div className="ButtonForPageChange">
        <Link to="/gantt-chart">ガントチャート</Link>
        <Link to="/board">ボード</Link>
        <Link to="/edit-field">エリア編集</Link>
      </div>
      <div className="Main">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
