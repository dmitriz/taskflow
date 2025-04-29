// Main entry point for the gmail-task-capture package

// Export the main functionality
export { fetchAndProcessEmails } from './email-processor';
export { removeSignature } from './remove-signature';
export { writeTask } from './tasks-writer';
export { authorize } from './auth';

// Export configuration
export { SETTINGS, QUERY_FILTERS, SIGNATURE } from './config';