import { describe, it, expect, vi } from 'vitest';
import fs from 'fs/promises';
import { write_task } from './tasks-writer.js';
import { SETTINGS } from './config.js';

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
  it('appends task with configurable newlines', async () => {
    // Clear any previous calls
    vi.clearAllMocks();

    const newlines = '\n'.repeat(SETTINGS.NEWLINES_AFTER_TASK);
    await write_task('My test task');
    expect(fs.appendFile).toHaveBeenCalledWith(expect.any(String), `My test task${newlines}`, 'utf8');
  });
});