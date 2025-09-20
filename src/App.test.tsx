import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import App from './App';

test('renders FlowBoard header', () => {
  render(<App />);
  expect(screen.getByText(/FlowBoard/i)).toBeInTheDocument();
});

test('can open Create Task modal and add a task', () => {
  render(<App />);
  const btn = screen.getByRole('button', { name: /create task/i });
  fireEvent.click(btn);
  const input = screen.getByPlaceholderText(/enter task title/i);
  fireEvent.change(input, { target: { value: 'Test Task' } });
  const modal = screen.getByRole('dialog');
  const create = within(modal).getByRole('button', { name: /^create$/i });
  fireEvent.click(create);
  // Task appears in To Do column
  expect(screen.getAllByText('Test Task')[0]).toBeInTheDocument();
});
