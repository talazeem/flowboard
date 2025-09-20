import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import App from '../App';

test('task modal elements have proper roles and labels', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /create task/i }));
  fireEvent.change(screen.getByPlaceholderText(/enter task title/i), { target: { value: 'AX' } });
  fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: /^create$/i }));
  fireEvent.click(screen.getAllByText('AX')[0]);
  const dialog = screen.getByRole('dialog');
  expect(within(dialog).getByRole('combobox')).toBeInTheDocument();
  expect(within(dialog).getByRole('button', { name: /^save$/i })).toBeInTheDocument();
  expect(within(dialog).getByRole('button', { name: /^cancel$/i })).toBeInTheDocument();
});


