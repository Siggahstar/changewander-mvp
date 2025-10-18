import create from 'zustand';

type State = {
  showDebug: boolean;
  setShowDebug: (v: boolean) => void;
};

// Workaround for TS typings mismatch in some zustand versions
const createStore = create as unknown as (fn: (set: any) => State) => any;

export const useAppStore = createStore((set) => ({
  showDebug: false,
  setShowDebug: (v: boolean) => set({ showDebug: v }),
}));

export default useAppStore;
