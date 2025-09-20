import React, { useState } from 'react';
import { useBoard } from '../BoardContext';
import { ColumnId } from '../types';

export function AddTaskForm({ columnId }: { columnId: ColumnId }) {
  const { dispatch } = useBoard();
  const [title, setTitle] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    dispatch({ type: 'addTask', payload: { columnId, title: trimmed } });
    setTitle('');
  };

  return (
    <form onSubmit={onSubmit} className="flex gap-2 mb-3">
      <input
        aria-label="Task title"
        className="flex-1 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        placeholder="Add a task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-md bg-brand-500 text-white px-3 py-2 text-sm hover:bg-brand-600"
        disabled={!title.trim()}
      >
        Add
      </button>
    </form>
  );
}


