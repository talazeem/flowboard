import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('header has Create Task button accessible by role and name', () => {
  render(<App />);
  const btn = screen.getByRole('button', { name: /create task/i });
  expect(btn).toBeInTheDocument();
});


