import React from "react";
import "./App.css";
import { ViewCalender } from "./ProjectComponent/ViewCalender";
import { CreateProject } from "./ProjectComponent/CreateProject";
import dayjs from "dayjs";

function App() {
  return (
    <div className="App">
      {/* <CreateProject/>   */}
      <div>BeForm</div>
      <div>ガントチャート</div>
      <ViewCalender />
    </div>
  );
}

export default App;
