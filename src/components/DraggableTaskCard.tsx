import React, { useRef } from 'react';
import { ColumnId, Task } from '../types';
import { useDrag } from '../dnd/DragProvider';
import { TaskCard } from './TaskCard';

export function DraggableTaskCard({ task, columnId, index }: { task: Task; columnId: ColumnId; index: number }) {
  const { startDrag, state } = useDrag();
  const isDragged = state.isDragging && state.task?.id === task.id && state.fromColumnId === columnId && state.over?.columnId !== columnId;
  const holdDelayMs = 150; // requested 0.15s
  const timerRef = useRef<number | null>(null);
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // allow click unless user holds
    timerRef.current = window.setTimeout(() => {
      e.preventDefault();
      startDrag({ task, fromColumnId: columnId, sourceIndex: index, pointer: { x: e.clientX, y: e.clientY } });
      timerRef.current = null;
    }, holdDelayMs);
  };
  const onMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };
  const onMouseLeave = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };
  if (isDragged) return null;
  return (
    <div
      data-task-card="true"
      data-task-id={task.id}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
    >
      <TaskCard task={task} columnId={columnId} />
    </div>
  );
}


