export interface Project {
  id: string;
  field: string;
  name: string;
  startDate: string;
  endDate: string;
}

export interface Field {
  field: string;
  id: string;
  color: string;
  permission: boolean;
  project: Project[];
}

export interface TypeDay {
  day: number;
  date: string;
}

export const defaultStateProject = [
  {
    field: '',
    id: '',
    name: '',
    startDate: '',
    endDate: '',
  },
];

export const defaultStateField = [
  {
    field: '',
    id: '',
    color: '',
    permission: false,
    project: defaultStateProject,
  },
];

export interface LoadContext {
  loading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export interface TypeOfRenderContext {
  render: boolean;
  setIsRender: (render: boolean) => void;
}

export interface TypeFieldContext {
  field: Field[];
  setField: (field: Field[]) => void;
}
