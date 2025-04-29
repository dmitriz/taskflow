import { fetch_emails } from './email-processor.js';

// Execute when run directly
if (import.meta.url === import.meta.main) {
  fetch_emails().catch(console.error);
}

// Re-export the main function
export { fetch_emails };