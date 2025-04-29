import fs from 'fs/promises';
import path from 'path';
import { SETTINGS, FILES } from './config.js';

const TASKS_FILE = path.join(process.cwd(), FILES.TASKS);

export async function write_task(task: string) {
  // Ensure the task content is appended exactly as provided
  const newlines = '\n'.repeat(SETTINGS.NEWLINES_AFTER_TASK);
  await fs.appendFile(TASKS_FILE, `${task}${newlines}`, 'utf8');
}

export async function write_tasks(tasks: string[]) {
  // Ensure all tasks are appended in a single batch
  const newlines = '\n'.repeat(SETTINGS.NEWLINES_AFTER_TASK);
  const content = tasks.map(task => `${task}${newlines}`).join('');
  await fs.appendFile(TASKS_FILE, content, 'utf8');
}