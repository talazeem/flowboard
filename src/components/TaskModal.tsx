import React, { useState } from 'react';
import { Modal } from './Modal';
import { ColumnId, Task } from '../types';
import { useBoard } from '../BoardContext';

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  task: Task;
  columnId: ColumnId;
}

export function TaskModal({ open, onClose, task, columnId }: TaskModalProps) {
  const { dispatch } = useBoard();
  const [title, setTitle] = useState(task.title);
  const [status, setStatus] = useState<ColumnId>(columnId);

  const save = () => {
    const trimmed = title.trim();
    if (trimmed && trimmed !== task.title) {
      dispatch({ type: 'editTask', payload: { columnId, taskId: task.id, title: trimmed } });
    }
    if (status !== columnId) {
      dispatch({ type: 'moveTask', payload: { from: columnId, to: status, taskId: task.id } });
    }
    onClose();
  };

  const del = () => {
    if (window.confirm('Delete this task?')) {
      dispatch({ type: 'deleteTask', payload: { columnId, taskId: task.id } });
      onClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Task Details"
      footer={(
        <>
          <button className="rounded-md border px-3 py-2 text-sm" onClick={onClose}>Cancel</button>
          <button className="rounded-md text-white bg-red-600 px-3 py-2 text-sm" onClick={del}>Delete</button>
          <button className="rounded-md bg-brand-500 text-white px-3 py-2 text-sm" onClick={save}>Save</button>
        </>
      )}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-slate-700 mb-1">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-700 mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as ColumnId)}
            className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="todo">To Do</option>
            <option value="inProgress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>
    </Modal>
  );
}


