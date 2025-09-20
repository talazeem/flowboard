import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import App from '../App';

test('cancel delete keeps the task', () => {
  jest.spyOn(window, 'confirm').mockReturnValue(false);
  render(<App />);
  // create
  fireEvent.click(screen.getByRole('button', { name: /create task/i }));
  fireEvent.change(screen.getByPlaceholderText(/enter task title/i), { target: { value: 'KeepMe' } });
  fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: /^create$/i }));
  fireEvent.click(screen.getAllByText('KeepMe')[0]);
  const dialog = screen.getByRole('dialog');
  fireEvent.click(within(dialog).getByRole('button', { name: /^delete$/i }));
  expect(screen.getByText('KeepMe')).toBeInTheDocument();
});


