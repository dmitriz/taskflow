const create_enum = (obj) => Object.freeze(obj);

export const SETTINGS = create_enum({
    MAX_EMAILS_TO_FETCH: 10,
    NEWLINES_AFTER_TASK: 3
});

export const QUERY_FILTERS = create_enum({
    SELF_SENT_UNREAD: "is:unread from:me to:me"
});

export const SIGNATURE = create_enum({
    SEPARATOR: "Best wishes"
});

export const FILES = create_enum({
    TASKS: "tasks.md",
    CREDENTIALS: "credentials.json",
    TOKEN: "token.json"
});
