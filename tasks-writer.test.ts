import { describe, it, expect, vi } from 'vitest';
import fs from 'fs/promises';
import { writeTask } from './tasks-writer.js';

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

describe('writeTask', () => {
  it('appends task with triple newline', async () => {
    // Clear any previous calls
    vi.clearAllMocks();
    
    await writeTask('My test task');
    expect(fs.appendFile).toHaveBeenCalledWith(expect.any(String), 'My test task\n\n\n', 'utf8');
  });
});