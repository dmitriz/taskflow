"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAndProcessEmails = fetchAndProcessEmails;
const googleapis_1 = require("googleapis");
const auth_js_1 = require("./auth.js");
const remove_signature_js_1 = require("./remove-signature.js");
const tasks_writer_js_1 = require("./tasks-writer.js");
const config_js_1 = require("./config.js");
function decodeBase64(data) {
    return Buffer.from(data, 'base64').toString('utf-8');
}
async function fetchAndProcessEmails() {
    const auth = await (0, auth_js_1.authorize)();
    const gmail = googleapis_1.google.gmail({ version: 'v1', auth });
    const listResponse = await gmail.users.messages.list({
        userId: 'me',
        q: config_js_1.QUERY_FILTERS.SELF_SENT_UNREAD,
        maxResults: config_js_1.SETTINGS.MAX_EMAILS_TO_FETCH,
    });
    const messages = listResponse.data.messages || [];
    if (!messages.length)
        return;
    for (const msg of messages) {
        const msgId = msg.id;
        if (!msgId)
            continue;
        try {
            const msgData = await gmail.users.messages.get({
                userId: 'me',
                id: msgId,
                format: 'full',
            });
            const payload = msgData.data.payload;
            let body = payload?.body?.data
                ? decodeBase64(payload.body.data)
                : payload?.parts?.[0]?.body?.data
                    ? decodeBase64(payload.parts[0].body.data)
                    : null;
            if (!body)
                continue;
            const cleanBody = (0, remove_signature_js_1.removeSignature)(body.trim());
            const lines = cleanBody.split('\n');
            const formatted = `- ${lines[0].trim()}\n${lines.slice(1).map(l => l.trim()).join('\n')}`;
            await (0, tasks_writer_js_1.writeTask)(formatted);
            await gmail.users.messages.modify({
                userId: 'me',
                id: msgId,
                requestBody: { removeLabelIds: ['UNREAD'] },
            });
        }
        catch (err) {
            console.error(`Failed processing message ${msgId}:`, err);
        }
    }
}
