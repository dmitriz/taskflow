import { fetch_emails } from './email-processor.js';
// Execute when run directly
if (import.meta.url === `file://${process.argv[1]}`) {
    fetch_emails().catch(console.error);
}
// Re-export the main function
export { fetch_emails };
//# sourceMappingURL=fetch-emails.js.map