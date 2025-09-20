// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Polyfill crypto.randomUUID in Jest/JSdom if missing
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const anyGlobal: any = globalThis as any;
if (!anyGlobal.crypto) {
  anyGlobal.crypto = {};
}
if (typeof anyGlobal.crypto.randomUUID !== 'function') {
  anyGlobal.crypto.randomUUID = () =>
    'test-' + Math.random().toString(16).slice(2) + '-' + Date.now().toString(16);
}
