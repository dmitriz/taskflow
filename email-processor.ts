import { google } from 'googleapis';
import { authorize_user } from './auth.js';
import { remove_signature } from './remove-signature.js';
import { write_task } from './tasks-writer.js';
import { SETTINGS, QUERY_FILTERS } from './config.js';
import { OAuth2Client } from 'google-auth-library';

function decode_base64(data: string): string {
  return Buffer.from(data, 'base64').toString('utf-8');
}

export async function fetch_and_process_emails() {
  const auth = await authorize_user() as OAuth2Client;
  const gmail = google.gmail({ version: 'v1', auth });

  const listResponse = await gmail.users.messages.list({
    userId: 'me',
    q: QUERY_FILTERS.SELF_SENT_UNREAD,
    maxResults: SETTINGS.MAX_EMAILS_TO_FETCH,
  });

  const messages = listResponse.data.messages || [];
  if (!messages.length) return;

  for (const msg of messages) {
    const msgId = msg.id;
    if (!msgId) continue;

    try {
      const msgData = await gmail.users.messages.get({
        userId: 'me',
        id: msgId,
        format: 'full',
      });

      const payload = msgData.data.payload;
      let body = payload?.body?.data
        ? decode_base64(payload.body.data)
        : payload?.parts?.[0]?.body?.data
          ? decode_base64(payload.parts[0].body.data)
          : null;

      // Filter out HTML parts if present
      if (payload?.mimeType === 'text/html') {
        console.warn(`Skipping HTML email with ID: ${msgId}`);
        continue;
      }

      if (!body) continue;

      const cleanBody = remove_signature(body.trim());
      const lines = cleanBody.split('\n');
      const formatted = `- ${lines[0].trim()}\n${lines.slice(1).map(l => l.trim()).join('\n')}`;
      await write_task(formatted);

      await gmail.users.messages.modify({
        userId: 'me',
        id: msgId,
        requestBody: { removeLabelIds: ['UNREAD'] },
      });

      console.log(`Processed email with ID: ${msgId}`);
    } catch (err) {
      console.error(`Failed processing message ${msgId}:`, err);
    }
  }
}

export { fetch_and_process_emails as fetch_emails };