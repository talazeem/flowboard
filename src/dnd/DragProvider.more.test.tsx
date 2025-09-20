import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';

test('same-column hover does not show placeholder (reorder disabled)', () => {
  jest.useFakeTimers();
  render(<App />);
  // create two tasks
  fireEvent.click(screen.getByRole('button', { name: /create task/i }));
  fireEvent.change(screen.getByPlaceholderText(/enter task title/i), { target: { value: 'A' } });
  fireEvent.click(screen.getByRole('button', { name: /^create$/i }));
  fireEvent.click(screen.getByRole('button', { name: /create task/i }));
  fireEvent.change(screen.getByPlaceholderText(/enter task title/i), { target: { value: 'B' } });
  fireEvent.click(screen.getByRole('button', { name: /^create$/i }));

  const firstCard = document.querySelector('[data-task-card="true"]') as HTMLElement;
  const todoCol = screen.getByTestId('todo') as HTMLElement;
  (todoCol as any).getBoundingClientRect = () => ({ left: 0, right: 300, top: 0, bottom: 800, width: 300, height: 800, x: 0, y: 0, toJSON() {} });

  fireEvent.mouseDown(firstCard, { clientX: 10, clientY: 10 });
  act(() => { jest.advanceTimersByTime(200); });
  // move inside same column
  act(() => { fireEvent.mouseMove(window, { clientX: 20, clientY: 100 }); });
  expect(document.querySelector('[data-placeholder="true"]')).toBeNull();
  jest.useRealTimers();
});


