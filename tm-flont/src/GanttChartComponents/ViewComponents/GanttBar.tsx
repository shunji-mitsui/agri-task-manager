import { Project } from '@/DefinitionType';
import { FC, useState } from 'react';
import {
  FlagContext,
  GanttBarContext,
} from '../FunctionsForGanttChart/UseContext';
import { Milestone } from './Milestone';

const ViewCalender: FC<{
  isChangeMode: boolean;
  setIsChangeMode: React.Dispatch<React.SetStateAction<boolean>>;
  isCreateMode: boolean;
  setIsCreateMode: React.Dispatch<React.SetStateAction<boolean>>;
  target: string;
  setTarget: React.Dispatch<React.SetStateAction<string>>;
  afterDay: string;
  setAfterDay: React.Dispatch<React.SetStateAction<string>>;
  flag: boolean;
  p: Project;
  d: string;
}> = ({
  isChangeMode,
  setIsChangeMode,
  isCreateMode,
  setIsCreateMode,
  target,
  setTarget,
  afterDay,
  setAfterDay,
  p,
  d,
}) => {
  const [onTerm, setOnTerm] = useState(false);
  // console.log('(カレンダー作成コンポーネント',p)
  return (
    <div>
      <FlagContext.Provider value={{ onTerm, setOnTerm }}>
        <GanttBarContext.Provider
          value={{
            isChangeMode,
            setIsChangeMode,
            isCreateMode,
            setIsCreateMode,
            target,
            setTarget,
            afterDay,
            setAfterDay,
          }}
        >
          <div>
            <Milestone project={p} day={d} />
            <br />
          </div>
        </GanttBarContext.Provider>
      </FlagContext.Provider>
    </div>
  );
};

export const ViewGanttBar: FC<{
  project: Project[];
  DayList: string[];
  flag: boolean;
}> = ({ project, DayList, flag }) => {
  const [isChangeMode, setIsChangeMode] = useState<boolean>(false);
  const [isCreateMode, setIsCreateMode] = useState<boolean>(false);
  const [target, setTarget] = useState<string>('');
  const [afterDay, setAfterDay] = useState<string>('');
  const ViewProject = project.map((p, key) => {
    const ViewDay = DayList.map((d, key) => {
      return (
        <div key={key}>
          <ViewCalender
            isChangeMode={isChangeMode}
            setIsChangeMode={setIsChangeMode}
            isCreateMode={isCreateMode}
            setIsCreateMode={setIsCreateMode}
            target={target}
            setTarget={setTarget}
            afterDay={afterDay}
            setAfterDay={setAfterDay}
            flag={flag}
            p={p}
            d={d}
          />
        </div>
      );
    });
    return <div key={key}>{ViewDay}</div>;
  });
  return <div>{ViewProject}</div>;
};
