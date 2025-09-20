export type ColumnId = 'todo' | 'inProgress' | 'done';

export interface Task {
  id: string;
  title: string;
}

export interface BoardState {
  columns: Record<ColumnId, Task[]>;
}

export const DEFAULT_BOARD_STATE: BoardState = {
  columns: {
    todo: [],
    inProgress: [],
    done: [],
  },
};

