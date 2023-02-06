import { createContext, useCallback, useState } from 'react';
import {
  defaultStateField,
  Field,
  LoadContext,
  TypeFieldContext,
  TypeOfRenderContext,
} from './Typed';

const defaultContext: LoadContext = {
  loading: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsLoading: () => {},
};
const defaultRenderContext: TypeOfRenderContext = {
  render: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsRender: () => {},
};

// context object
export const IsLoadContext = createContext<LoadContext>(defaultContext);

// custom Hook
export const useLoad = (): LoadContext => {
  // state名はThemeContext typeのプロパティに合わせる。
  const [loading, setLoading] = useState(false);
  // 関数名はThemeContext typeのプロパティに合わせる。
  const setIsLoading = useCallback((current: boolean): void => {
    setLoading(current);
  }, []);
  return {
    loading,
    setIsLoading,
  };
};

export const RenderContext =
  createContext<TypeOfRenderContext>(defaultRenderContext);

export const useRender = (): TypeOfRenderContext => {
  const [render, setRender] = useState(false);
  const setIsRender = useCallback((current: boolean): void => {
    setRender(current);
  }, []);
  return {
    render,
    setIsRender,
  };
};

const defaultFieldContext: TypeFieldContext = {
  field: defaultStateField,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setField: () => {},
};

export const FieldContext =
  createContext<TypeFieldContext>(defaultFieldContext);

export const useField = (): TypeFieldContext => {
  const [field, setfield] = useState(defaultStateField);
  const setField = useCallback((current: Field[]): void => {
    setfield(current);
  }, []);
  return {
    field,
    setField,
  };
};
