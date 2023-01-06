import { endianness } from "os";
import React from "react";
import {
  useState,
  useEffect,
  FC,
  createContext,
  useContext,
  useReducer,
} from "react";
// import './App.css';
import axios from "axios";
import { Project, Task } from "../DefinitionType";

export const DeleteProject: FC<{ id: string }> = ({ id }) => {
  const deleteProject = async () => {
    await axios
      .post("http://127.0.0.1:8000/project/delete", {
        id: id,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <div>
      <button
        onClick={(e) => {
          deleteProject();
        }}
      >
        {" "}
        プロジェクト削除
      </button>
    </div>
  );
};

export const UpDateProject = (id: string, item: string) => {
  axios
    .post("http://127.0.0.1:8000/project/update", {
      id: id,
      target: "name",
      value: item,
    })
    .then((res) => {
      if (res.data.status == 100) {
        alert("その期間は別の予定が入っています。");
      } else if (res.data.status == 101) {
        alert("開始日が終了日よりも後になっています。");
      }
      console.log(res.data);
    });
};

export const ProjectHeader: FC<{
  id: string;
  title: string;
  content: string;
}> = ({ id, title, content }) => {
  const [item, setItem] = useState("");
  const [flag, setFlag] = useState(false);
  if (flag) {
    return (
      <div>
        品目:
        <input type="text" onChange={(e) => setItem(e.target.value)} />
        <button
          onClick={(e) => {
            if (item == "") {
              alert(
                `入力が空になっています。\n※変更後のエリアを入力してください`
              );
            } else {
              setFlag(!flag);
              UpDateProject(id, item);
            }
          }}
        >
          変更
        </button>
        <button
          onClick={(e) => {
            setFlag(!flag);
          }}
        >
          キャンセル
        </button>
        <DeleteProject id={id} />
      </div>
    );
  } else {
    return (
      <div>
        <div onClick={(e) => setFlag(!flag)}>品目:{content}</div>
        <DeleteProject id={id} />
      </div>
    );
  }
};
