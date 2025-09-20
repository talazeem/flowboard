import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import App from '../App';

function createTask(title: string) {
  fireEvent.click(screen.getByRole('button', { name: /create task/i }));
  fireEvent.change(screen.getByPlaceholderText(/enter task title/i), { target: { value: title } });
  fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: /^create$/i }));
}

test('edit title and change status via modal', () => {
  render(<App />);
  createTask('Edit Me');
  fireEvent.click(screen.getAllByText('Edit Me')[0]);
  const dialog = screen.getByRole('dialog');
  const input = within(dialog).getByDisplayValue('Edit Me');
  fireEvent.change(input, { target: { value: 'Edited' } });
  fireEvent.change(within(dialog).getByRole('combobox'), { target: { value: 'inProgress' } });
  fireEvent.click(within(dialog).getByRole('button', { name: /^save$/i }));
  expect(screen.getAllByText('Edited')[0]).toBeInTheDocument();
});


