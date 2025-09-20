import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';

test('placeholder appears at end of empty column on hover', () => {
  jest.useFakeTimers();
  render(<App />);
  // create a task to drag
  fireEvent.click(screen.getByRole('button', { name: /create task/i }));
  fireEvent.change(screen.getByPlaceholderText(/enter task title/i), { target: { value: 'A' } });
  fireEvent.click(screen.getByRole('button', { name: /^create$/i }));

  const cardWrap = document.querySelector('[data-task-card="true"]') as HTMLElement;
  // start hold-to-drag
  fireEvent.mouseDown(cardWrap, { clientX: 10, clientY: 10 });
  act(() => {
    jest.advanceTimersByTime(200);
  });

  const doneCol = screen.getByTestId('done') as HTMLElement;
  // mock bounding rects so computeOver can work in jsdom
  const todoCol = screen.getByTestId('todo') as HTMLElement;
  const inProgCol = screen.getByTestId('inProgress') as HTMLElement;
  (todoCol as any).getBoundingClientRect = () => ({ left: 0, right: 300, top: 0, bottom: 800, width: 300, height: 800, x: 0, y: 0, toJSON() {} });
  (inProgCol as any).getBoundingClientRect = () => ({ left: 320, right: 620, top: 0, bottom: 800, width: 300, height: 800, x: 320, y: 0, toJSON() {} });
  (doneCol as any).getBoundingClientRect = () => ({ left: 640, right: 940, top: 0, bottom: 800, width: 300, height: 800, x: 640, y: 0, toJSON() {} });

  // hover near/just below the bottom of the Done column to target end slot
  act(() => {
    fireEvent.mouseMove(window, { clientX: 650, clientY: 810 });
  });

  const placeholder = document.querySelector('[data-placeholder="true"]');
  expect(placeholder).toBeTruthy();
  jest.useRealTimers();
});


