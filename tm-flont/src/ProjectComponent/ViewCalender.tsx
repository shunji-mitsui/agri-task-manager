// import './App.css';
import React from "react";
import { useState, useEffect, FC } from "react";
import axios from "axios";
import { Gantt } from "./Gantt";
import { Project, FProject } from "../DefinitionType";
import { ProjectHeader } from "./OneProjectView";
import dayjs from "dayjs";
import { CreateProject, RegistorProject } from "./CreateProject";

const Header = () => {
  const DayList = [...Array(30)].map((_, i) =>
    dayjs().add(i, "d").format("YYYY-MM-DD")
  );
  const [flag, setFlag] = useState(false);
  const AddForm = () => {
    if (flag) {
      return (
        <div>
          <CreateProject />
        </div>
      );
    }
    return <div onClick={(e) => setFlag(true)}>+</div>;
  };

  const ViewDay = DayList.map((d) => {
    return (
      <div>
        {/* <div className='AllView'> */}
        <div className="day">
          <div>{d}</div>
        </div>
        {/* </div> */}
      </div>
    );
  });
  return (
    <div className="AllView debug">
      <div className="Navbar">
        日付
        <AddForm />
      </div>
      <div>
        <div className="AllView">{ViewDay}</div>
      </div>
    </div>
  );
};

const OneProject: FC<{ project: Project }> = ({ project }) => {
  const DayList = [...Array(30)].map((_, i) =>
    dayjs().add(i, "d").format("YYYY-MM-DD")
  );
  return (
    <div className="AllView">
      <div className="Navbar">
        <ProjectHeader id={project.id} title="name" content={project.name} />
      </div>
      <div>
        <Gantt project={project} DayList={DayList} />
      </div>
    </div>
  );
};

const LP: FC<{ p: Project[] }> = ({ p }) => {
  const view = p.map((i) => {
    return (
      <div>
        {/* {i.name} */}
        <OneProject project={i} />
      </div>
    );
  });
  return <div>{view}</div>;
};

// eslintのtoolでインデントを整える
//
const ViewProjectList: FC<{ projectList: FProject[] }> = ({ projectList }) => {
  console.log(projectList);
  const LUP = projectList.map((p) => {
    return (
      <div className="AllView">
        {p.field}
        <div onClick={(e) => {}}>＋</div>
        <LP p={p.project} />
      </div>
    );
  });
  return (
    <div className="AllView">
      <div>{LUP}</div>
    </div>
  );
};

// const sortingByField=(projectList:Project[])=>{
//    const sort=projectList.map((p)=>{
//      if(p.field=='A'){
//        return
//      }

//    })
// }

export const ViewCalender = () => {
  const [viewProject, setViewProject] = useState<FProject[]>([
    {
      field: "",
      project: [
        {
          field: "",
          id: "",
          name: "",
          startDate: "",
          endDate: "",
          task: [{ parentId: "", id: "", task: "", date: "" }],
        },
      ],
    },
  ]);
  // const [viewTestroject,setViewTestProject]=useState<TestProject[]>([{field:'',id:'',name:'',startDate:'',endDate:'',task:[{parentId:'',id:'',task:'',date:''}]}])
  const getProject = async () => {
    // const UserCount = createContext(false);
    await axios.get("http://127.0.0.1:8000/project/get").then((res) => {
      setViewProject(res.data);
      // console.log(res.data[0])
      // console.log(res.data[1])
      // setViewTestProject(viewproject);
    });
  };
  useEffect(() => {
    getProject();
  }, []);

  return (
    <div className="TaskInfo">
      <Header />
      <ViewProjectList projectList={viewProject} />
    </div>
  );
};
