import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';

test('modal closes on Escape key', () => {
  const onClose = jest.fn();
  render(
    <Modal open title="Title" onClose={onClose}>
      Body
    </Modal>
  );
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(onClose).toHaveBeenCalled();
});

test('modal without title renders children', () => {
  render(
    <Modal open onClose={() => {}}>
      Content
    </Modal>
  );
  expect(screen.getByText('Content')).toBeInTheDocument();
});


