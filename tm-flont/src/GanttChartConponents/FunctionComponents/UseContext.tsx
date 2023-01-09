import React from "react";
import { useState, FC, ReactNode, createContext } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

type Children = {
  children: ReactNode;
};
type FlagContextType = {
  setOnTerm: (value: boolean) => void;
  onTerm: boolean;
};

export const FlagContext = createContext<FlagContextType>(
  {} as FlagContextType
);
export const FlagProvider: FC<Children> = ({ children }) => {
  const [onTerm, setOnTerm] = useState<boolean>(true);
  return (
    <div>
      <FlagContext.Provider value={{ onTerm, setOnTerm }}>
        {children}
      </FlagContext.Provider>
    </div>
  );
};

type GanttBarStateContextType = {
  isChangeMode: boolean;
  isCreateMode: boolean;
  target: string;
  afterDay: string;
  setIsChangeMode: (value: boolean) => void;
  setIsCreateMode: (value: boolean) => void;
  setTarget: (value: string) => void;
  setAfterDay: (value: string) => void;
};

export const GanttBarContext = createContext<GanttBarStateContextType>(
  {} as GanttBarStateContextType
);
