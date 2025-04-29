if (require.main === module) {
  import('./fetch-emails.js').then(({ fetch_emails }) => fetch_emails());
}