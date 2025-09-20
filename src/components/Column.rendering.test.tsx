import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import App from '../App';

test('column renders header titles and containers', () => {
  render(<App />);
  expect(screen.getByText('To Do')).toBeInTheDocument();
  expect(screen.getByText('In Progress')).toBeInTheDocument();
  expect(screen.getByText('Done')).toBeInTheDocument();
  expect(screen.getByTestId('todo')).toBeInTheDocument();
});

test('placeholder renders when dragging over non-source column', () => {
  jest.useFakeTimers();
  render(<App />);
  // create a task
  fireEvent.click(screen.getByRole('button', { name: /create task/i }));
  fireEvent.change(screen.getByPlaceholderText(/enter task title/i), { target: { value: 'PX' } });
  fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: /^create$/i }));

  const cardWrap = document.querySelector('[data-task-card="true"]') as HTMLElement;
  const doneCol = screen.getByTestId('done') as HTMLElement;
  (doneCol as any).getBoundingClientRect = () => ({ left: 640, right: 940, top: 0, bottom: 800, width: 300, height: 800, x: 640, y: 0, toJSON() {} });

  fireEvent.mouseDown(cardWrap, { clientX: 10, clientY: 10 });
  jest.advanceTimersByTime(200);
  fireEvent.mouseMove(window, { clientX: 650, clientY: 100 });
  const placeholder = document.querySelector('[data-placeholder="true"]');
  expect(placeholder).toBeTruthy();
  jest.useRealTimers();
});


