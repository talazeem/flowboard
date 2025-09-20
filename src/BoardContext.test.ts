import { boardReducer } from './BoardContext';
import { DEFAULT_BOARD_STATE } from './types';

test('addTask appends to bottom with uuid', () => {
  const state = DEFAULT_BOARD_STATE;
  const next = boardReducer(state, { type: 'addTask', payload: { columnId: 'todo', title: 'Task A' } });
  expect(next.columns.todo).toHaveLength(1);
  expect(next.columns.todo[0].title).toBe('Task A');
  expect(typeof next.columns.todo[0].id).toBe('string');
});

test('moveTask between columns places at end by default', () => {
  let s = boardReducer(DEFAULT_BOARD_STATE, { type: 'addTask', payload: { columnId: 'todo', title: 'X' } });
  const id = s.columns.todo[0].id;
  s = boardReducer(s, { type: 'moveTask', payload: { from: 'todo', to: 'inProgress', taskId: id } });
  expect(s.columns.todo).toHaveLength(0);
  expect(s.columns.inProgress[0].id).toBe(id);
});

test('reorder within a column', () => {
  let s = DEFAULT_BOARD_STATE;
  s = boardReducer(s, { type: 'addTask', payload: { columnId: 'todo', title: 'A' } });
  s = boardReducer(s, { type: 'addTask', payload: { columnId: 'todo', title: 'B' } });
  const a = s.columns.todo[0].id;
  const b = s.columns.todo[1].id;
  s = boardReducer(s, { type: 'reorder', payload: { columnId: 'todo', fromIndex: 0, toIndex: 1 } });
  expect(s.columns.todo[0].id).toBe(b);
  expect(s.columns.todo[1].id).toBe(a);
  // drop at end allowed
  s = boardReducer(s, { type: 'reorder', payload: { columnId: 'todo', fromIndex: 0, toIndex: 2 } });
  expect(s.columns.todo[1].id).toBe(b);
});

