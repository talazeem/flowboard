import React from 'react';
import { render, screen } from '@testing-library/react';
import { Modal } from './Modal';

test('modal has dialog role and aria-modal', () => {
  render(
    <Modal open title="Title" onClose={() => {}}>
      Body
    </Modal>
  );
  const dialog = screen.getByRole('dialog');
  expect(dialog).toHaveAttribute('aria-modal', 'true');
});


