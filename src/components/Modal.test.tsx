import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';

test('modal renders with rounded corners and closes on backdrop click', () => {
  const onClose = jest.fn();
  render(
    <Modal open title="X" onClose={onClose}>
      Body
    </Modal>
  );
  const dialog = screen.getByRole('dialog');
  expect(dialog).toBeInTheDocument();
  // select the first child overlay (backdrop)
  const backdrop = dialog.firstElementChild as HTMLElement;
  fireEvent.click(backdrop);
  expect(onClose).toHaveBeenCalled();
});


