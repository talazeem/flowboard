import React, { useEffect, useRef } from 'react';
import { ColumnId } from '../types';
import { useDrag } from '../dnd/DragProvider';

interface ColumnProps {
  id: ColumnId;
  title: string;
  header?: React.ReactNode;
  children?: React.ReactNode; // task cards only
}

export function Column({ id, title, header, children }: ColumnProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { state, registerDropzone } = useDrag();

  useEffect(() => {
    registerDropzone(id, ref.current);
    return () => registerDropzone(id, null);
  }, [id, registerDropzone]);

  const showPlaceholder = state.isDragging && state.over && state.over.columnId === id && state.fromColumnId !== id;
  const placeholderIndex = showPlaceholder ? state.over!.index : -1;

  return (
    <div className="min-w-[350px] flex-1 basis-0">
      <h3 className="text-slate-700 font-medium mb-3">{title}</h3>
      {header}
      <div ref={ref} data-column-id={id} data-testid={id} className="rounded-lg bg-slate-50 border p-3 min-h-[700px]">
        {(() => {
          const rawNodes = React.Children.toArray(children);
          const nodes = rawNodes.filter((node) => {
            if (!state.isDragging || state.fromColumnId !== id || !state.task) return true;
            if (React.isValidElement(node)) {
              const anyNode = node as any;
              const childTaskId = anyNode?.props?.task?.id;
              return childTaskId !== state.task.id;
            }
            return true;
          });
          return (
            <>
              {nodes.map((node, idx) => (
                <React.Fragment key={(node as any).key ?? idx}>
                  {showPlaceholder && idx === placeholderIndex ? (
                    <div data-placeholder="true" className="mb-3 rounded-lg border-2 border-dashed border-brand-500/60 bg-brand-50 h-12" />
                  ) : null}
                  {node}
                </React.Fragment>
              ))}
              {showPlaceholder && placeholderIndex === nodes.length ? (
                <div data-placeholder="true" className="mb-3 rounded-lg border-2 border-dashed border-brand-500/60 bg-brand-50 h-12" />
              ) : null}
            </>
          );
        })()}
      </div>
    </div>
  );
}


