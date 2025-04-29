import fs from 'fs/promises';
import path from 'path';

const TASKS_FILE = path.join(process.cwd(), 'tasks.md');

export async function writeTask(task: string) {
  await fs.appendFile(TASKS_FILE, task + '\n\n\n', 'utf8');
}