### FlowBoard

A lightweight Kanban-style board (Trello/Jira-inspired) built with React + TypeScript and Tailwind CSS. Focused on clear state management, native drag-and-drop, and strong tests/documentation.

### Features
- Three columns: To Do, In Progress, Done
- Header “Create Task” modal to add tasks (title required)
- Task details modal: edit title, change status (dropdown), delete (confirm)
- Native mouse drag-and-drop across columns with cursor-following preview and dashed placeholder
- Same-column reorder is disabled (by decision); cross-column moves only
- Debounced localStorage persistence and hydration
- Responsive, flexible columns with pleasant, minimal styling

### Tech Stack
- React (TypeScript), Tailwind CSS
- Jest + React Testing Library

### Requirements
- Node 18+ and npm

### Getting Started
1) Install dependencies
```bash
npm install
```

2) Run the app
```bash
npm start
```
App runs at `http://localhost:3000`.

3) Run tests (single run with coverage)
```bash
npm test
```
Coverage thresholds are enforced (80% global). A coverage summary is printed after the run.

4) Build
```bash
npm run build
```

### Usage Tips
- Create tasks via the header button.
- Click a card to open details; update title or change status; Save/Cancel close the modal.
- Hold a card for ~0.15s to start dragging; move across columns; drop to place.

### Project Structure
See `PROJECT_STRUCTURE.md` for an annotated folder breakdown. Highlights:
- `src/BoardContext.tsx`: Context + reducer + debounced localStorage
- `src/components/`: UI components (columns, cards, modals)
- `src/dnd/`: Drag-and-drop provider and draggable wrappers

### Architecture & Decisions
Documented in `ARCHITECTURE.md`:
- Context + reducer; debounced persistence to `flowboard.tasks`
- Same-column reorder disabled per product decision; cross-column moves supported
- A11y and minimal animation conventions

### Testing Strategy
Documented in `TEST_STRATEGY.md`:
- Reducer unit tests, modal/component interaction tests
- DnD integration tests (placeholder, cross-column move)

### Roadmap / Good To Have
Deferred enhancements are tracked in `goodToHave.md` (e.g., refined ghost preview, keyboard navigation, filters).

### License
MIT — see `LICENSE`.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
