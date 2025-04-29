import { describe, it, expect, vi } from 'vitest';
import fs from 'fs/promises';
import { write_task } from './tasks-writer.js';

// Correctly mock fs/promises with default export
vi.mock('fs/promises', async () => {
  const mockAppendFile = vi.fn().mockResolvedValue(undefined);
  return {
    default: {
      appendFile: mockAppendFile
    },
    appendFile: mockAppendFile
  };
});

describe('write_task', () => {
  it('appends task with triple newline', async () => {
    // Clear any previous calls
    vi.clearAllMocks();
    
    await write_task('My test task');
    expect(fs.appendFile).toHaveBeenCalledWith(expect.any(String), 'My test task\n\n\n', 'utf8');
  });
});