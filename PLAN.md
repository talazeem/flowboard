### FlowBoard Delivery Plan

This living plan breaks development into verifiable UI milestones. After each milestone, I will provide a testable snippet and await your sign-off before proceeding.

### Key Decisions (Locked)
- **Framework/Styling**: React (TypeScript) + Tailwind CSS
- **Testing**: Jest + React Testing Library (coverage > 80%)
- **State Management**: React Context + reducer
- **Persistence**: localStorage (no versioning for now)
- **DnD**: Mouse-only, native events; reordering supported; simple placeholder first
- **Tasks**: UUID identities; bottom insertion; inline editing saved on blur
- **Delete**: Confirm before delete
- **Columns**: "To Do", "In Progress", "Done"
- **Layout**: 3 columns side-by-side (33% each) with horizontal scroll on small screens
- **Card UI**: Min 80x40, title wraps to two lines then ellipsis
- **UI Quality Bar**: Clean, delightful, Trello/Jira-like styling (without lib components)

### Milestones and Verification Checkpoints

#### M0 — Project Setup and Theming [status: pending]
- Initialize React + TS + Tailwind; configure Jest + RTL; `npm run start` runs dev server.
- Establish base Tailwind theme (colors, spacing, radii, shadows) for a Trello-like feel.
- Output: App boots; neutral landing layout scaffolded.
- Verification: You confirm visual baseline (typography, spacing, color tokens).

#### M1 — Data Model and Board Context [status: pending]
- Define `Task` (id uuid, title string), `ColumnId` (todo, inProgress, done).
- Implement `BoardContext` with reducer and actions (add, edit, move, reorder, delete, hydrate).
- Wire localStorage persistence under `flowboard.tasks`.
- Verification: Console/devtools inspection, unit tests for reducer + persistence.

#### M2 — Core Layout (3 Columns) [status: pending]
- Build fixed 3-column shell with headers and counters; horizontal scroll when constrained.
- Ensure columns occupy ~33% each; responsive spacing and sticky board header.
- Verification: Visual check; resizing behavior; snapshot tests.

#### M3 — Add Task (To Do) + Inline Edit [status: pending]
- Input at top of "To Do"; validate non-empty; insert at bottom.
- Render task cards (min 80x40) with two-line clamp + ellipsis.
- Inline edit on card title; save on blur; Esc cancels; basic a11y.
- Verification: Interact to add/edit; unit tests for add/edit behaviors.

#### M4 — Move Buttons (Fallback Navigation) [status: pending]
- Buttons on each card: move to previous/next column where applicable.
- Confirmation dialog on delete; graceful focus management.
- Verification: Interact to move/delete; unit tests for move/delete.

#### M5 — Drag-and-Drop (Mouse, Native) with Reordering [status: pending]
- Implement mousedown/mousemove/mouseup DnD across and within columns.
- Simple placeholder highlight during drag; drop to precise index for reorder.
- Verification: Interact to reorder/relocate; unit tests for reducer-level ordering.

#### M6 — Persistence and Resilience Polish [status: pending]
- Ensure hydrate/save flows are robust; debounce writes; guard malformed storage.
- Verification: Refresh retains state; tests cover persistence integration.

#### M7 — Animations and A11y Pass [status: pending]
- Add subtle transitions (hover, elevation, move) and visible focus rings.
- Verification: Visual feel; keyboard flows for buttons; a11y attributes spot-check.

#### M8 — Coverage and Refinement [status: pending]
- Raise Jest coverage > 80% across core behaviors.
- Tidy code, comments (why, not how), and docs.
- Verification: Coverage report and green test suite.

### Checkpoint Deliverables per Milestone
- Testable UI snippet or minimal screen recording
- Unit tests (where applicable)
- Documentation updates: `PROJECT_STRUCTURE.md`, `ARCHITECTURE.md`, `TEST_STRATEGY.md`, `CHAT_HISTORY.md`
- `goodToHave.md` entries for deferred enhancements (e.g., ghost preview refinement)

### Definition of Done (per PRD)
- Add, move, reorder, delete work with confirmations and inline edit on blur.
- Native mouse DnD without external libs; state persisted to localStorage.
- Three-column responsive layout with pleasant, cohesive styling.
- Jest + RTL tests with > 80% coverage.
- Docs updated and plan statuses current.

### Status Log
- 2025-09-20: Plan created with agreed decisions and milestones. [status: active]


