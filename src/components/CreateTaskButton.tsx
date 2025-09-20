import React, { useState } from 'react';
import { Modal } from './Modal';
import { useBoard } from '../BoardContext';

export function CreateTaskButton() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const { dispatch } = useBoard();

  const create = () => {
    const trimmed = title.trim();
    if (!trimmed) return;
    // New tasks go to To Do by default
    dispatch({ type: 'addTask', payload: { columnId: 'todo', title: trimmed } });
    setTitle('');
    setOpen(false);
  };

  return (
    <>
      <button
        className="rounded-md bg-brand-500 text-white px-3 py-2 text-sm hover:bg-brand-600"
        onClick={() => setOpen(true)}
      >
        + Create Task
      </button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Create Task"
        footer={(
          <>
            <button className="rounded-md border px-3 py-2 text-sm" onClick={() => setOpen(false)}>Cancel</button>
            <button className="rounded-md bg-brand-500 text-white px-3 py-2 text-sm disabled:opacity-50" disabled={!title.trim()} onClick={create}>Create</button>
          </>
        )}
      >
        <div className="space-y-2">
          <label className="block text-sm text-slate-700">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            placeholder="Enter task title"
            autoFocus
          />
        </div>
      </Modal>
    </>
  );
}


