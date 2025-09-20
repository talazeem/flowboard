import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import App from '../App';

test('create task flow adds to To Do and persists', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /create task/i }));
  fireEvent.change(screen.getByPlaceholderText(/enter task title/i), { target: { value: 'Persist Me' } });
  const modal = screen.getByRole('dialog');
  fireEvent.click(within(modal).getByRole('button', { name: /^create$/i }));
  expect(screen.getAllByText('Persist Me')[0]).toBeInTheDocument();
});


