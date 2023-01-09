import React, { useState, FC } from "react";
import { postProject } from "../FunctionComponents/FunctionForProject";

const CreateProject: FC<{ field: string }> = ({ field }) => {
  const [item, setItem] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [f, setF] = useState(true);
  return (
    <div>
      品目
      <input type="text" onChange={(e) => setItem(e.target.value)} />
      開始日 <input type="date" onChange={(e) => setStart(e.target.value)} />
      <br />
      終了日 <input type="date" onChange={(e) => setEnd(e.target.value)} />
      <button
        className="login_element button"
        onClick={(e) => postProject(item, field, start, end, f, setF)}
      >
        登録
      </button>
    </div>
  );
};


export const AddForm: FC<{
  field: string;
  flag: boolean;
  setFlag: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ field, flag, setFlag }) => {
  if (flag) {
    return (
      <div>
        <CreateProject field={field} />
      </div>
    );
  }
  return <div onClick={(e) => setFlag(true)}>+</div>;
};
