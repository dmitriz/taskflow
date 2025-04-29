import fs from 'fs/promises';
import path from 'path';
import { SETTINGS, FILES } from './config.js';

const TASKS_FILE = path.join(process.cwd(), FILES.TASKS);

export async function write_task(task: string) {
  const newlines = '\n'.repeat(SETTINGS.NEWLINES_AFTER_TASK);
  await fs.appendFile(TASKS_FILE, task + newlines, 'utf8');
}