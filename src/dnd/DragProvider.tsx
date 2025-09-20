import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { ColumnId, Task } from '../types';
import { useBoard } from '../BoardContext';

type Over = { columnId: ColumnId; index: number } | null;

interface DragState {
  isDragging: boolean;
  task: Task | null;
  fromColumnId: ColumnId | null;
  sourceIndex: number;
  pointer: { x: number; y: number } | null;
  over: Over;
}

interface DragContextValue {
  state: DragState;
  startDrag: (args: { task: Task; fromColumnId: ColumnId; sourceIndex: number; pointer: { x: number; y: number } }) => void;
  registerDropzone: (columnId: ColumnId, el: HTMLElement | null) => void;
}

const DragContext = createContext<DragContextValue | undefined>(undefined);

export function useDrag() {
  const ctx = useContext(DragContext);
  if (!ctx) throw new Error('useDrag must be used within DragProvider');
  return ctx;
}

export function DragProvider({ children }: { children: React.ReactNode }) {
  const { dispatch } = useBoard();
  const [state, setState] = useState<DragState>({
    isDragging: false,
    task: null,
    fromColumnId: null,
    sourceIndex: -1,
    pointer: null,
    over: null,
  });

  const dropzones = useRef<Partial<Record<ColumnId, HTMLElement>>>({});

  const registerDropzone = useCallback((columnId: ColumnId, el: HTMLElement | null) => {
    if (el) {
      dropzones.current[columnId] = el;
    } else {
      delete dropzones.current[columnId];
    }
  }, []);

  const computeOver = useCallback((x: number, y: number): Over => {
    const entries = Object.entries(dropzones.current) as Array<[ColumnId, HTMLElement]>;
    for (const [colId, el] of entries) {
      const rect = el.getBoundingClientRect();
      if (x >= rect.left && x <= rect.right) {
        // if pointer is above the column area, target the first slot
        if (y < rect.top) {
          return { columnId: colId, index: 0 };
        }
        // if pointer is below the column area, target the end slot
        if (y > rect.bottom) {
          const childrenAfter = Array.from(el.querySelectorAll('[data-task-card="true"]')) as HTMLElement[];
          return { columnId: colId, index: childrenAfter.length };
        }
        if (y >= rect.top && y <= rect.bottom) {
          // find index
          const children = Array.from(el.querySelectorAll('[data-task-card="true"]')) as HTMLElement[];
          let index = children.length; // default to end
          for (let i = 0; i < children.length; i++) {
            const r = children[i].getBoundingClientRect();
            const mid = r.top + r.height / 2;
            if (y < mid) {
              index = i;
              break;
            }
          }
          return { columnId: colId, index };
        }
      }
    }
    return null;
  }, []);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (state.isDragging) {
      e.preventDefault();
    }
    setState(prev => {
      if (!prev.isDragging) return prev;
      const pointer = { x: e.clientX, y: e.clientY };
      const over = computeOver(pointer.x, pointer.y);
      return { ...prev, pointer, over };
    });
  }, [computeOver, state.isDragging]);

  const onMouseUp = useCallback(() => {
    setState(prev => {
      if (!prev.isDragging || !prev.task || !prev.fromColumnId) return prev;
      const over = prev.over;
      const sourceIndex = prev.sourceIndex; // kept for potential future logic
      const from = prev.fromColumnId;
      const taskId = prev.task.id;
      if (over) {
        if (over.columnId === from) {
          // Same-column reorder disabled by request: no-op on drop.
        } else {
          dispatch({ type: 'moveTask', payload: { from, to: over.columnId, taskId, toIndex: over.index } });
        }
      }
      return { isDragging: false, task: null, fromColumnId: null, sourceIndex: -1, pointer: null, over: null };
    });
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  const startDrag = useCallback((args: { task: Task; fromColumnId: ColumnId; sourceIndex: number; pointer: { x: number; y: number } }) => {
    // Prevent text selection during drag
    document.body.classList.add('select-none');
    setState({ isDragging: true, task: args.task, fromColumnId: args.fromColumnId, sourceIndex: args.sourceIndex, pointer: args.pointer, over: null });
  }, []);

  useEffect(() => {
    if (!state.isDragging) {
      document.body.classList.remove('select-none');
    }
  }, [state.isDragging]);

  const value = useMemo(() => ({ state, startDrag, registerDropzone }), [state, startDrag, registerDropzone]);

  return <DragContext.Provider value={value}>{children}</DragContext.Provider>;
}


