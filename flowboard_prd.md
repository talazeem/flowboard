# FlowBoard – Product Requirements Document (PRD)

## 1. Vision
FlowBoard is a lightweight Kanban-style task management application inspired by Trello.  
Its purpose is to empower engineers to think deeply about **state management**, **UI design trade-offs**, and **AI-native iterative development** while delivering a simple, interactive, and persistent task management tool.

---

## 2. Core Functional Requirements

1. **Columns**
   - Fixed three-column board layout:
     - **To Do**
     - **In Progress**
     - **Done**
   - Columns displayed side-by-side, each occupying 33% of the horizontal space.

2. **Add Task**
   - Users can add a new task (title only) to the **To Do** column.
   - Empty task titles are not allowed.

3. **Move Task**
   - Tasks can be moved across columns either by:
     - **Drag-and-drop** using **native browser events** (`mousedown`, `mousemove`, `mouseup`).
     - OR **buttons** (e.g., “Move to Next Column”, “Move to Previous Column”).

4. **Delete Task**
   - Users can delete a task from any column.

5. **Task State**
   - Task state must be stored in React component state.
   - State management choice (lifting state up, Context API, or Redux) must be documented in `ARCHITECTURE.md`.

6. **Drag-and-Drop**
   - Must use **native drag-drop implementation** (no external libraries like `react-dnd`, `interact.js`, `konva.js`).

7. **Persistence**
   - All tasks persist in `localStorage` so they remain available after refresh.

8. **Filtering (Optional)**
   - A simple filter option (e.g., show only tasks in “In Progress”).

9. **Testing**
   - Include **unit tests** for core functionality (adding, moving, deleting tasks, persistence).

---

## 3. UI Layout

1. **Three-Column Structure**
   - **Left (33%)** – To Do (includes task input form at the top).
   - **Middle (33%)** – In Progress.
   - **Right (33%)** – Done.

2. **Task Cards**
   - Each task displayed as a card with:
     - Task title
     - Buttons for delete and move (fallback if drag-drop fails).
   - Cards are draggable.

3. **Interactions**
   - Visual cues during drag-drop (e.g., highlight drop target).
   - Smooth animations for task movement (via Tailwind utilities, CSS transitions).

---

## 4. Technical Constraints

- Must use **React** with **TypeScript** and **Tailwind CSS**.
- **No external drag-drop libraries**.
- Must compile and run locally with `npm run start`.
- No API dependencies (only `localStorage`).
- No third-party UI libraries (e.g., Material UI, AntD, shadcn).
- Deliverables include:
  - `PROJECT_STRUCTURE.md`
  - `ARCHITECTURE.md`
  - `CHAT_HISTORY.md`
  - `TEST_STRATEGY.md`
  - 5–7 minute demo video walkthrough.

---

## 5. Technology Stack

- **Framework**: React (with TypeScript)
- **Styling**: Tailwind CSS
- **State Management**: To be decided (document trade-offs in `ARCHITECTURE.md`)
- **Persistence**: localStorage
- **Testing**: Jest + React Testing Library

---

## 6. Success Criteria

- Functional three-column Kanban board.
- Add, move, delete tasks fully working.
- Native drag-drop without libraries.
- State persists in localStorage.
- Code is modular, well-documented, and testable.
- Meets constraints and documented trade-offs.
