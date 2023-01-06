import React from "react";
import { useState, FC } from "react";
import axios from "axios";

export const RegistorProject: FC<{
  field: string;
  item: string;
  start: string;
  end: string;
}> = ({ field, item, start, end }) => {
  const [f, setF] = useState(true);
  const getIp = () => {
    axios
      .post("http://127.0.0.1:8000/project", {
        item: item,
        field: field,
        start: start,
        end: end,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status == 100) {
          alert("その期間は予定が入っています");
        } else if (res.data.status == 101) {
          alert("開始日が終了日よりも後になっています。");
        }
      });
    setF(!f);
  };
  return (
    <button className="login_element button" onClick={getIp}>
      プロジェクト登録
    </button>
  );
};

export const CreateProject = () => {
  const [item, setItem] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [field, setField] = useState("");
  return (
    <div>
      エリア
      <input type="text" onChange={(e) => setField(e.target.value)} />
      品目
      <input type="text" onChange={(e) => setItem(e.target.value)} />
      開始日 <input type="date" onChange={(e) => setStart(e.target.value)} />
      <br />
      終了日{" "}
      <input
        type="date"
        name=""
        id=""
        onChange={(e) => setEnd(e.target.value)}
      />
      {/* <ProjectInfo /> */}
      <RegistorProject field={field} item={item} start={start} end={end} />
    </div>
  );
};
