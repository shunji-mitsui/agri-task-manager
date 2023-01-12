import { Dashboard } from '@mui/icons-material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { EditArea } from './GanttChartComponents/EditField/EditFieldArea';
import { ViewGanttChart } from './GanttChartComponents/View/Templetes/GanttChart';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/gantt-chart" element={<ViewGanttChart />} />
        <Route path="board" element={<Dashboard />} />
        <Route path="edit-field" element={<EditArea />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
