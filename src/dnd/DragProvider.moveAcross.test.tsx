import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';

test('drag and drop across columns moves the task and cleans up selection class', () => {
  jest.useFakeTimers();
  render(<App />);

  // Create a task in To Do
  fireEvent.click(screen.getByRole('button', { name: /create task/i }));
  fireEvent.change(screen.getByPlaceholderText(/enter task title/i), { target: { value: 'MoveMe' } });
  fireEvent.click(screen.getByRole('button', { name: /^create$/i }));

  const cardWrap = document.querySelector('[data-task-card="true"]') as HTMLElement;
  const todoCol = screen.getByTestId('todo') as HTMLElement;
  const inProgCol = screen.getByTestId('inProgress') as HTMLElement;

  // Mock rects for hit detection
  (todoCol as any).getBoundingClientRect = () => ({ left: 0, right: 300, top: 0, bottom: 800, width: 300, height: 800, x: 0, y: 0, toJSON() {} });
  (inProgCol as any).getBoundingClientRect = () => ({ left: 320, right: 620, top: 0, bottom: 800, width: 300, height: 800, x: 320, y: 0, toJSON() {} });

  // Hold to start drag
  fireEvent.mouseDown(cardWrap, { clientX: 10, clientY: 10 });
  act(() => { jest.advanceTimersByTime(200); });
  // Move over In Progress
  act(() => { fireEvent.mouseMove(window, { clientX: 340, clientY: 100 }); });
  // Drop
  act(() => { fireEvent.mouseUp(window); });

  // Card should now appear in In Progress
  expect(within(inProgCol).getByText('MoveMe')).toBeInTheDocument();
  // select-none should be removed from body
  expect(document.body.classList.contains('select-none')).toBe(false);

  jest.useRealTimers();
});


