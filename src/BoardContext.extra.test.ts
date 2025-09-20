import { boardReducer } from './BoardContext';
import { DEFAULT_BOARD_STATE, BoardState } from './types';

describe('boardReducer comprehensive', () => {
  test('hydrate replaces state', () => {
    const custom: BoardState = {
      columns: { todo: [{ id: '1', title: 't' }], inProgress: [], done: [] },
    };
    const s = boardReducer(DEFAULT_BOARD_STATE, { type: 'hydrate', payload: custom });
    expect(s.columns.todo[0].title).toBe('t');
  });

  test('editTask updates title', () => {
    let s = boardReducer(DEFAULT_BOARD_STATE, { type: 'addTask', payload: { columnId: 'todo', title: 'A' } });
    const id = s.columns.todo[0].id;
    s = boardReducer(s, { type: 'editTask', payload: { columnId: 'todo', taskId: id, title: 'A2' } });
    expect(s.columns.todo[0].title).toBe('A2');
  });

  test('deleteTask removes task', () => {
    let s = boardReducer(DEFAULT_BOARD_STATE, { type: 'addTask', payload: { columnId: 'todo', title: 'A' } });
    const id = s.columns.todo[0].id;
    s = boardReducer(s, { type: 'deleteTask', payload: { columnId: 'todo', taskId: id } });
    expect(s.columns.todo).toHaveLength(0);
  });

  test('moveTask honors toIndex inside target column', () => {
    let s = DEFAULT_BOARD_STATE;
    s = boardReducer(s, { type: 'addTask', payload: { columnId: 'todo', title: 'A' } });
    s = boardReducer(s, { type: 'addTask', payload: { columnId: 'todo', title: 'B' } });
    const a = s.columns.todo[0].id;
    const b = s.columns.todo[1].id;
    s = boardReducer(s, { type: 'moveTask', payload: { from: 'todo', to: 'inProgress', taskId: a, toIndex: 0 } });
    s = boardReducer(s, { type: 'moveTask', payload: { from: 'todo', to: 'inProgress', taskId: b, toIndex: 0 } });
    expect(s.columns.inProgress.map(t => t.title)).toEqual(['B', 'A']);
  });

  test('reorder clamps out-of-range indices and allows drop at end', () => {
    let s = DEFAULT_BOARD_STATE;
    s = boardReducer(s, { type: 'addTask', payload: { columnId: 'todo', title: 'A' } });
    s = boardReducer(s, { type: 'addTask', payload: { columnId: 'todo', title: 'B' } });
    s = boardReducer(s, { type: 'addTask', payload: { columnId: 'todo', title: 'C' } });
    // move first to end
    s = boardReducer(s, { type: 'reorder', payload: { columnId: 'todo', fromIndex: 0, toIndex: 3 } });
    expect(s.columns.todo.map(t => t.title)).toEqual(['B', 'C', 'A']);
    // negative target clamps to 0
    s = boardReducer(s, { type: 'reorder', payload: { columnId: 'todo', fromIndex: 2, toIndex: -5 } });
    expect(s.columns.todo.map(t => t.title)[0]).toBe('A');
  });
});


