import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import App from '../App';

test('task modal save updates title', () => {
  render(<App />);
  // create
  fireEvent.click(screen.getByRole('button', { name: /create task/i }));
  fireEvent.change(screen.getByPlaceholderText(/enter task title/i), { target: { value: 'X' } });
  fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: /^create$/i }));
  // open modal from card
  fireEvent.click(screen.getAllByText('X')[0]);
  const dialog = screen.getByRole('dialog');
  const input = within(dialog).getByDisplayValue('X');
  fireEvent.change(input, { target: { value: 'X2' } });
  fireEvent.click(within(dialog).getByRole('button', { name: /^save$/i }));
  expect(screen.getAllByText('X2')[0]).toBeInTheDocument();
});

test('task modal delete removes card', () => {
  // confirm dialogs are used
  jest.spyOn(window, 'confirm').mockReturnValue(true);
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /create task/i }));
  fireEvent.change(screen.getByPlaceholderText(/enter task title/i), { target: { value: 'Del' } });
  fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: /^create$/i }));
  fireEvent.click(screen.getAllByText('Del')[0]);
  const dialog = screen.getByRole('dialog');
  fireEvent.click(within(dialog).getByRole('button', { name: /^delete$/i }));
  expect(screen.queryByText('Del')).toBeNull();
});


