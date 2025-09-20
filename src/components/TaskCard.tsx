import React, { useRef, useState } from 'react';
import { ColumnId, Task } from '../types';
import { useBoard } from '../BoardContext';
import { TaskModal } from './TaskModal';

interface TaskCardProps {
  task: Task;
  columnId: ColumnId;
}

export function TaskCard({ task, columnId }: TaskCardProps) {
  const { dispatch } = useBoard();
  const [open, setOpen] = useState(false);
  const justClosedRef = useRef(false);

  const handleOpen = () => {
    if (justClosedRef.current) return;
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    justClosedRef.current = true;
    // reset the guard after this event loop tick
    setTimeout(() => {
      justClosedRef.current = false;
    }, 0);
  };

  return (
    <div className="rounded-lg bg-white border shadow-card p-3 mb-3 cursor-pointer card-transition" onClick={handleOpen}>
      <div className="text-sm text-slate-800">
        <div className="line-clamp-2 break-words min-h-[40px]">
          {task.title}
        </div>
      </div>
      <TaskModal open={open} onClose={handleClose} task={task} columnId={columnId} />
    </div>
  );
}


