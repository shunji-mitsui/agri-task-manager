import {
  useState,
  useEffect,
  FC,
  createContext,
  useContext,
  useReducer,
} from "react";
import axios from "axios";
import { Project } from "../../DefinitionType";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);
import { ViewTaskList } from "./ViewTask";
import { GanttBarContext } from "../FunctionComponents/UseContext";
import { IsOnTerm } from "../FunctionComponents/FunctionForProject";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";

export const AddMileStone: FC<{
  day: string;
  select: string[];
  setSelect: React.Dispatch<React.SetStateAction<string[]>>;
  selectedFlag: boolean;
  setSelectedFlag: React.Dispatch<React.SetStateAction<boolean>>;
  field: string;
}> = ({ day, select, setSelect, field }) => {
  const [selectedFlag,setSelectedFlag]=useState(false)
  return (
    <div className={selectedFlag ? "selected day" : "day"}>
      <div
        onClick={(e) => {
          if (!select[0]) {
            const selectDay = [day];
            setSelect(selectDay);
            setSelectedFlag(true)
          } else {
            // const firstSelect = select[0];
            setSelectedFlag(true)
            const selectDays = select;
            selectDays.push(day);
            setSelect(selectDays);
            const item = window.prompt("野菜を入力");
            if (item) {
              axios
              .post("http://127.0.0.1:8000/project", {
                start: select[0],
                end: select[1],
                item: item,
                field: field,
              })
                .then((res) => {
                  if (res.data.status==100){
                    alert('同一エリア内での期間が重複しています。')
                  }
                  console.log(res.data)
                  setSelect([""]);
                });
              }else{
                setSelect([""]);
              }
              setSelectedFlag(false)
            }
          }}
          >
        -
      </div>
    </div>
  );
};

export const AddForm: FC<{ DayList: string[]; field: string }> = ({
  DayList,
  field,
}) => {
  // console.log(DayList,'uuuuuuuuuuu')
  const [select, setSelect] = useState([""]);
  const [selectedFlag, setSelectedFlag] = useState(false);
  console.log(select);
  const ViewAddForm = DayList.map((d) => {
    return (
      <div>
        <AddMileStone
          day={d}
          select={select}
          setSelect={setSelect}
          selectedFlag={selectedFlag}
          setSelectedFlag={setSelectedFlag}
          field={field}
        />
      </div>
    );
  });
  return (
    // <div
    //   onClick={(e) => {
    //     if (isCreateMode) {
    //       setTarget("○");
    //       setIsCreateMode(!isCreateMode);
    //       const projectName = window.prompt(
    //         "プロジェクト名を入力してください",
    //         ""
    //       );
    //     } else {
    //       setTarget("○");
    //       setIsCreateMode(!isCreateMode);
    //     }
    //   }}
    // >
    //   {target}
    // </div>
    <div className="AllView">{ViewAddForm}</div>
  );
};

export const Milestone: FC<{
  day: string;
  project: Project;
}> = ({ day, project }) => {
  const useFlag = IsOnTerm(project, day).flag;
  const content = IsOnTerm(project, day).content;
  // console.log('マイルストーン作成1',project.name)
  const func = IsOnTerm(project, day).func;
  const target = IsOnTerm(project, day).target;
  // console.log('マイルストーン作成1',content)
  let task: any;
  if (useFlag) {
    task = (
      <div>
        <ViewTaskList project={project} day={day} />
      </div>
    );
  }
  return (
    <div>
      {target}
      <div
        className={useFlag ? "Istrue" : ""}
        onClick={(e) => {
          func();
        }}
      >
        {content}
        {task}
      </div>
    </div>
  );
};
