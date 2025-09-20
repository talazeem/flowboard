### Project Structure

- `src/`
  - `index.tsx`: App bootstrap.
  - `index.css`: Tailwind base/components/utilities and small transitions.
  - `App.tsx`: Root shell, header, 3-column board, providers.
  - `types.ts`: Shared types (`Task`, `ColumnId`, `BoardState`).
  - `BoardContext.tsx`: Context + reducer + debounced localStorage persistence.
  - `components/`
    - `Column.tsx`: Column container with placeholder rendering.
    - `TaskCard.tsx`: Card with modal trigger.
    - `TaskModal.tsx`: Modal to edit title, change status, or delete.
    - `CreateTaskButton.tsx`: Header button and create modal.
    - `Modal.tsx`: Generic modal.
  - `dnd/`
    - `DragProvider.tsx`: Mouse DnD state, over-calculation, and drop handling.
    - `DraggableTaskCard.tsx`: Adds drag affordance/gesture to a card.
- `public/`: CRA static assets and `index.html`.
- `tailwind.config.js`: Tailwind scanning and theme extensions.
- `postcss.config.js`: PostCSS plugins.
- Jest config lives in `package.json`; tests live alongside components.
- `PLAN.md`: Milestones (M0–M8) and checkpoints.
- `ARCHITECTURE.md`: Design decisions (to be filled as features land).
- `TEST_STRATEGY.md`: Test scope and coverage goals (>80%).
- `CHAT_HISTORY.md`: Notes of decisions and changes.
- `goodToHave.md`: Deferred enhancements.

