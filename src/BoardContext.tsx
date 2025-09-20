import React, { createContext, useContext, useEffect, useMemo, useReducer, useRef } from 'react';
import { BoardState, ColumnId, DEFAULT_BOARD_STATE, Task } from './types';

function generateUuid(): string {
  // Prefer secure uuid if available; fallback to RFC4122-ish
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const anyGlobal = globalThis as any;
  if (anyGlobal.crypto && typeof anyGlobal.crypto.randomUUID === 'function') {
    return anyGlobal.crypto.randomUUID();
  }
  // simple fallback
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

type Action =
  | { type: 'hydrate'; payload: BoardState }
  | { type: 'addTask'; payload: { columnId: ColumnId; title: string } }
  | { type: 'editTask'; payload: { columnId: ColumnId; taskId: string; title: string } }
  | { type: 'deleteTask'; payload: { columnId: ColumnId; taskId: string } }
  | { type: 'moveTask'; payload: { from: ColumnId; to: ColumnId; taskId: string; toIndex?: number } }
  | { type: 'reorder'; payload: { columnId: ColumnId; fromIndex: number; toIndex: number } };

function cloneColumns(state: BoardState): Record<ColumnId, Task[]> {
  return {
    todo: [...state.columns.todo],
    inProgress: [...state.columns.inProgress],
    done: [...state.columns.done],
  };
}

export function boardReducer(state: BoardState, action: Action): BoardState {
  switch (action.type) {
    case 'hydrate':
      return action.payload;
    case 'addTask': {
      const { columnId, title } = action.payload;
      const newTask: Task = { id: generateUuid(), title };
      const columns = cloneColumns(state);
      columns[columnId] = [...columns[columnId], newTask];
      return { columns };
    }
    case 'editTask': {
      const { columnId, taskId, title } = action.payload;
      const columns = cloneColumns(state);
      columns[columnId] = columns[columnId].map(t => (t.id === taskId ? { ...t, title } : t));
      return { columns };
    }
    case 'deleteTask': {
      const { columnId, taskId } = action.payload;
      const columns = cloneColumns(state);
      columns[columnId] = columns[columnId].filter(t => t.id !== taskId);
      return { columns };
    }
    case 'moveTask': {
      const { from, to, taskId, toIndex } = action.payload;
      const columns = cloneColumns(state);
      const fromList = columns[from];
      const idx = fromList.findIndex(t => t.id === taskId);
      if (idx === -1) return state;
      const [task] = fromList.splice(idx, 1);
      const targetList = columns[to];
      const index = typeof toIndex === 'number' ? Math.max(0, Math.min(toIndex, targetList.length)) : targetList.length;
      targetList.splice(index, 0, task);
      return { columns };
    }
    case 'reorder': {
      const { columnId, fromIndex, toIndex } = action.payload;
      const columns = cloneColumns(state);
      const list = columns[columnId];
      if (fromIndex < 0 || fromIndex >= list.length) {
        return state;
      }
      let target = toIndex;
      if (target < 0) target = 0;
      if (target > list.length) target = list.length;
      const [task] = list.splice(fromIndex, 1);
      list.splice(target, 0, task);
      return { columns };
    }
    default:
      return state;
  }
}

interface BoardContextValue {
  state: BoardState;
  dispatch: React.Dispatch<Action>;
}

const BoardContext = createContext<BoardContextValue | undefined>(undefined);

const STORAGE_KEY = 'flowboard.tasks';

function usePersistedReducer() {
  const [state, dispatch] = useReducer(boardReducer, DEFAULT_BOARD_STATE);
  const saveTimerRef = useRef<number | null>(null);

  // hydrate once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as BoardState;
        dispatch({ type: 'hydrate', payload: parsed });
      }
    } catch {}
  }, []);

  // persist on change
  useEffect(() => {
    if (saveTimerRef.current) {
      window.clearTimeout(saveTimerRef.current);
    }
    saveTimerRef.current = window.setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {}
      saveTimerRef.current = null;
    }, 150);
    return () => {
      if (saveTimerRef.current) {
        window.clearTimeout(saveTimerRef.current);
        saveTimerRef.current = null;
      }
    };
  }, [state]);

  return [state, dispatch] as const;
}

export function BoardProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = usePersistedReducer();
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
}

export function useBoard() {
  const ctx = useContext(BoardContext);
  if (!ctx) throw new Error('useBoard must be used within BoardProvider');
  return ctx;
}


