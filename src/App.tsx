import React from 'react';
import { BoardProvider, useBoard } from './BoardContext';
import { Column } from './components/Column';
import { DraggableTaskCard } from './components/DraggableTaskCard';
import { CreateTaskButton } from './components/CreateTaskButton';
import { DragProvider } from './dnd/DragProvider';
import { useDrag } from './dnd/DragProvider';

function BoardView() {
  const { state } = useBoard();
  return (
    <DragProvider>
      <div className="rounded-xl border bg-white p-6 shadow-sm relative">
        <DragPreviewLayer />
        <div className="flex gap-4 overflow-x-auto">
          <Column id="todo" title="To Do">
            {state.columns.todo.map((t, i) => (
              <DraggableTaskCard key={t.id} task={t} columnId="todo" index={i} />
            ))}
          </Column>
          <Column id="inProgress" title="In Progress">
            {state.columns.inProgress.map((t, i) => (
              <DraggableTaskCard key={t.id} task={t} columnId="inProgress" index={i} />
            ))}
          </Column>
          <Column id="done" title="Done">
            {state.columns.done.map((t, i) => (
              <DraggableTaskCard key={t.id} task={t} columnId="done" index={i} />
            ))}
          </Column>
        </div>
      </div>
    </DragProvider>
  );
}

function DragPreviewLayer() {
  const { state } = useDrag();
  if (!state.isDragging || !state.task || !state.pointer) return null;
  const style: React.CSSProperties = {
    position: 'fixed',
    left: state.pointer.x + 8,
    top: state.pointer.y + 8,
    width: 320,
    pointerEvents: 'none',
    zIndex: 60,
  };
  return (
    <div style={style} className="opacity-90">
      <div className="rounded-lg bg-white border shadow-xl p-3">
        <div className="text-sm text-slate-800 line-clamp-2 min-h-[40px]">
          {state.task.title}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BoardProvider>
      <div className="min-h-screen bg-slate-50">
        <header className="border-b bg-white">
          <div className="mx-auto max-w-7xl px-6 py-4 flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-brand-500 text-white grid place-items-center font-semibold shadow-card">F</div>
            <h1 className="text-xl font-semibold text-slate-800">FlowBoard</h1>
            <div className="flex-1" />
            <CreateTaskButton />
          </div>
        </header>
        <main className="px-6 py-8">
          <BoardView />
        </main>
      </div>
    </BoardProvider>
  );
}

export default App;
