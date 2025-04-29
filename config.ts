export const SIGNATURE = {
  SEPARATOR: 'Best wishes',
} as const;

export const FILES = {
  TASKS: 'tasks.md',
  CREDENTIALS: 'credentials.json',
  TOKEN: 'token.json',
} as const;

export const SETTINGS = {
  MAX_EMAILS_TO_FETCH: 10,
  TASK_PREFIX: '- ',
  NEWLINES_AFTER_TASK: 2,
  OAUTH_REDIRECT_URI: 'http://localhost:3000/oauth2callback',
} as const;

export const QUERY_FILTERS = {
  SELF_SENT_UNREAD: 'from:me is:unread',
} as const;