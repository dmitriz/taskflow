export enum SETTINGS {
  MAX_EMAILS_TO_FETCH = 10,
  NEWLINES_AFTER_TASK = 3,
}

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