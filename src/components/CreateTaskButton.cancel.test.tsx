import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import App from '../App';

test('cancel in Create Task modal does not add a task', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /create task/i }));
  fireEvent.change(screen.getByPlaceholderText(/enter task title/i), { target: { value: 'ShouldNotAdd' } });
  const dialog = screen.getByRole('dialog');
  fireEvent.click(within(dialog).getByRole('button', { name: /^cancel$/i }));
  expect(screen.queryByText('ShouldNotAdd')).toBeNull();
});

test('create button disabled when title empty', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /create task/i }));
  const dialog = screen.getByRole('dialog');
  const createBtn = within(dialog).getByRole('button', { name: /^create$/i });
  expect(createBtn).toBeDisabled();
});


