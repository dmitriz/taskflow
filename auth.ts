import { google } from 'googleapis';
import fs from 'fs/promises';
import path from 'path';
import http from 'http';
import { default as open } from 'open';
import destroyer from 'server-destroy';
import { fileURLToPath } from 'url';
import { FILES } from './config.js';
import { OAuth2Client } from 'google-auth-library';
import crypto from 'crypto';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CREDENTIALS_PATH = path.join(__dirname, 'secrets', FILES.CREDENTIALS);
const TOKEN_PATH = path.join(__dirname, 'secrets', FILES.TOKEN);

const ENCRYPTION_KEY = crypto.randomBytes(32); // Replace with a securely stored key
const IV_LENGTH = 16;

function encrypt(text: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`;
}

function decrypt(text: string): string {
  const [iv, encrypted] = text.split(':');
  const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, Buffer.from(iv, 'hex'));
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

export async function authorize_user() {
  let client = await load_saved_credentials_if_exist();
  if (client) return client;

  const content = await fs.readFile(CREDENTIALS_PATH, 'utf8');
  const credentials = JSON.parse(content);
  const { client_secret, client_id } = credentials.installed;

  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    'http://localhost:3000/oauth2callback'
  );

  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/gmail.readonly',
      'https://www.googleapis.com/auth/gmail.modify',
    ],
  });

  await open(authorizeUrl);

  const server = http.createServer(async (req: http.IncomingMessage, res: http.ServerResponse) => {
    const url = req.url || '';
    if (url.indexOf('/oauth2callback') > -1) {
      const qs = new URL(url, 'http://localhost:3000').searchParams;
      const code = qs.get('code');
      if (!code) {
        res.end('Error: Missing code parameter.');
        return;
      }
      res.end('Authentication successful! You can close this window.');
      server.destroy();

      const tokenResponse = await oAuth2Client.getToken(code);
      oAuth2Client.setCredentials(tokenResponse.tokens);
      await save_credentials(oAuth2Client);
    }
  }).listen(3000);

  destroyer(server);
  return new Promise(resolve => {
    server.on('close', () => {
      resolve(oAuth2Client);
    });
  });
}

async function load_saved_credentials_if_exist() {
  try {
    const content = await fs.readFile(TOKEN_PATH, 'utf8');
    const credentials = JSON.parse(content);
    credentials.refresh_token = decrypt(credentials.refresh_token);
    return google.auth.fromJSON(credentials);
  } catch {
    return null;
  }
}

async function save_credentials(client: OAuth2Client) {
  try {
    const content = await fs.readFile(CREDENTIALS_PATH, 'utf8');
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = {
      type: 'authorized_user',
      client_id: key.client_id,
      client_secret: key.client_secret,
      refresh_token: encrypt(client.credentials.refresh_token || ''),
    };
    await fs.writeFile(TOKEN_PATH, JSON.stringify(payload));
  } catch (error) {
    console.error('Failed to save credentials:', error);
    throw error;
  }
}