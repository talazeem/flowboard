import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import App from './App';

test('hydrates from localStorage on load', () => {
  const state = {
    columns: {
      todo: [{ id: 't1', title: 'From Storage' }],
      inProgress: [],
      done: [],
    },
  };
  window.localStorage.setItem('flowboard.tasks', JSON.stringify(state));
  render(<App />);
  expect(screen.getByText('From Storage')).toBeInTheDocument();
});

test('persists to localStorage after changes (debounced)', () => {
  jest.useFakeTimers();
  const setSpy = jest.spyOn(window.localStorage.__proto__, 'setItem');
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /create task/i }));
  fireEvent.change(screen.getByPlaceholderText(/enter task title/i), { target: { value: 'Persisted' } });
  fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: /^create$/i }));
  // advance debounce timer in BoardContext
  jest.advanceTimersByTime(200);
  expect(setSpy).toHaveBeenCalledWith('flowboard.tasks', expect.any(String));
  setSpy.mockRestore();
  jest.useRealTimers();
});


