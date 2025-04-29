import { describe, it, expect } from 'vitest';
import { removeSignature } from './remove-signature.js';

describe('removeSignature', () => {
  it('removes signature when separator is present', () => {
    const email = 'Task content\n\nBest wishes\nJohn';
    const cleaned = removeSignature(email);
    expect(cleaned).toBe('Task content');
  });

  it('returns original when no separator present', () => {
    const email = 'Task content without signature';
    const cleaned = removeSignature(email);
    expect(cleaned).toBe(email);
  });
});