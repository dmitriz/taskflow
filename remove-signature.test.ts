import { describe, it, expect } from 'vitest';
import { remove_signature } from './remove-signature.js';

describe('remove_signature', () => {
  it('removes signature when separator is present', () => {
    const email = 'Task content\n\nBest wishes\nJohn';
    const cleaned = remove_signature(email);
    expect(cleaned).toBe('Task content');
  });

  it('returns original when no separator present', () => {
    const email = 'Task content without signature';
    const cleaned = remove_signature(email);
    expect(cleaned).toBe(email);
  });
});