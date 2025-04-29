import fs from 'fs/promises';
import path from 'path';
import { SETTINGS, FILES } from './config.js';
import { fileURLToPath } from 'url';
// Allow overriding the tasks file for integration testing via environment variable
const TASKS_FILE = process.env.TASKS_FILE_PATH ?? path.join(path.dirname(fileURLToPath(import.meta.url)), FILES.TASKS);
export async function write_task(task) {
    // Ensure the task content is appended exactly as provided
    const newlines = '\n'.repeat(SETTINGS.NEWLINES_AFTER_TASK);
    // SETTINGS.NEWLINES_AFTER_TASK determines the number of newlines to append after each task
    try {
        await fs.appendFile(TASKS_FILE, `${task}${newlines}`, 'utf8');
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(`Failed to write task: ${error.message}`);
        }
        else {
            console.error('Failed to write task: Unknown error');
        }
        throw error;
    }
}
export async function write_tasks(tasks) {
    // Ensure all tasks are appended in a single batch
    const newlines = '\n'.repeat(SETTINGS.NEWLINES_AFTER_TASK);
    const content = tasks.map(task => `${task}${newlines}`).join('');
    await fs.appendFile(TASKS_FILE, content, 'utf8');
}
//# sourceMappingURL=tasks-writer.js.map