"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeTask = writeTask;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const TASKS_FILE = path_1.default.join(process.cwd(), 'tasks.md');
async function writeTask(task) {
    await promises_1.default.appendFile(TASKS_FILE, task + '\n\n\n', 'utf8');
}
