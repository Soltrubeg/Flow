import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type {} from '@redux-devtools/extension' // required for devtools typing

type VariableStore = {
  variables: Record<string, string>;
  setVariable: (name: string, value: string) => void;
  getVariable: (name: string) => string | undefined;
};

export const VariableStore = create<VariableStore>((set, get) => ({
  variables: {},

  setVariable: (name, value) =>
    set((state) => ({
      variables: { ...state.variables, [name]: value },
    })),

  getVariable: (name) => get().variables[name],
}));
