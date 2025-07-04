import { google } from 'googleapis';
import fs from 'fs/promises';
import path from 'path';
import http from 'http';
import { default as open } from 'open';
import destroyer from 'server-destroy';
import { fileURLToPath } from 'url';
import { FILES } from './config.js';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CREDENTIALS_PATH = path.join(__dirname, 'secrets', FILES.CREDENTIALS);
const TOKEN_PATH = path.join(__dirname, 'secrets', FILES.TOKEN);
export async function authorize_user() {
    let client = await load_saved_credentials_if_exist();
    if (client)
        return client;
    const content = await fs.readFile(CREDENTIALS_PATH, 'utf8');
    const credentials = JSON.parse(content);
    const { client_secret, client_id } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, 'http://localhost:3000/oauth2callback');
    const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: [
            'https://www.googleapis.com/auth/gmail.readonly',
            'https://www.googleapis.com/auth/gmail.modify',
        ],
    });
    await open(authorizeUrl);
    const server = http.createServer(async (req, res) => {
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
        return google.auth.fromJSON(credentials);
    }
    catch {
        return null;
    }
}
async function save_credentials(client) {
    try {
        const content = await fs.readFile(CREDENTIALS_PATH, 'utf8');
        const keys = JSON.parse(content);
        const key = keys.installed || keys.web;

        // Validate refresh_token
        if (!client.credentials.refresh_token) {
            throw new Error('Missing refresh_token in client credentials.');
        }

        const payload = {
            type: 'authorized_user',
            client_id: key.client_id,
            client_secret: key.client_secret,
            refresh_token: client.credentials.refresh_token,
        };

        // Write token with restricted permissions
        await fs.writeFile(TOKEN_PATH, JSON.stringify(payload), { mode: 0o600 });
    } catch (error) {
        // Sanitize error message
        console.error('Failed to save credentials. Please check your configuration.');
        throw error;
    }
}
