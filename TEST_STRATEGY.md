### Test Strategy

Goal: >80% coverage on core behaviors with Jest + RTL. Enforced via coverage thresholds in `package.json`.

Scopes
- Reducer unit tests: add, edit, move, reorder, delete, hydrate.
- Component tests: Create modal validation/cancel flows; task modal edit/save/delete confirm; modal accessibility/behavior.
- Integration: Persistence hydrate/save (debounced) via mocked localStorage; DnD cross-column move and placeholder logic.

Out of scope for now
- E2E tests; cross-browser automation.

Coverage measurement
- Use CRA's Jest defaults; verify statement/branch/function coverage >80%.

