### Architecture Overview

FlowBoard is a React (TypeScript) app styled with Tailwind CSS. State is managed via React Context + reducer, persisted to localStorage (debounced writes).

#### Patterns
- Context + reducer for board state and actions (add, edit, move, reorder, delete, hydrate).
- Presentation components for UI (columns, cards) separated from state logic.

#### Decisions (from PRD & confirmations)
- UUIDs for tasks; insert at bottom; inline edit saves on blur.
- Delete requires confirmation.
- Mouse-only native DnD; same-column reorder disabled (per request); cross-column moves supported with a single dashed placeholder and cursor-following preview.
- Three columns fixed; horizontal scroll on narrow widths.

#### Persistence
- Single key `flowboard.tasks` storing serialized board state; hydrate on app load; debounce saves (150ms) to avoid excessive writes.

#### Testing
- Jest + React Testing Library; coverage thresholds enforced (80% global). Modal/DnD/persistence covered through integration tests.

Further details will be elaborated as features land (M1–M5).

