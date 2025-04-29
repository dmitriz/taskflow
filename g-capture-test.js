// package-entry.test.ts
import { expect, it } from 'vitest';
import { fetch_emails } from 'g-capture';

it('fetch_emails should be a function', () => {
  expect(typeof fetch_emails).toBe('function');
});

it('fetch_emails should run without throwing', async () => {
  await fetch_emails();
});
