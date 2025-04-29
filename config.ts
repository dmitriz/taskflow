export const SETTINGS = {
  MAX_EMAILS_TO_FETCH: 10,
  NEWLINES_AFTER_TASK: 3,
  OAUTH_REDIRECT_URI: 'http://localhost:3000/oauth2callback', // Add the redirect URI
  TASK_PREFIX: '- ', // Default task prefix
};

export enum QUERY_FILTERS {
  SELF_SENT_UNREAD = 'is:unread from:me to:me',
}

export enum SIGNATURE {
  SEPARATOR = 'Best wishes',
}

export enum FILES {
  TASKS = 'tasks.md',
  CREDENTIALS = 'credentials.json',
  TOKEN = 'token.json',
}