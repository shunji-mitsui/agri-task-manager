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

type RenderContextType = {
  setRender: (value: boolean) => void;
  render: boolean;
};

export const RenderContext = createContext<RenderContextType>(
  {} as RenderContextType
);

export const RenderProvider: FC<Children> = ({ children }) => {
  const [render, setRender] = useState<boolean>(true);
  return (
    <div>
      <RenderContext.Provider value={{ render, setRender }}>
        {children}
      </RenderContext.Provider>
    </div>
  );
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
