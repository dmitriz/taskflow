"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = authorize;
const googleapis_1 = require("googleapis");
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const open_1 = __importDefault(require("open"));
const server_destroy_1 = __importDefault(require("server-destroy"));
// Use CommonJS __dirname approach
const CREDENTIALS_PATH = path_1.default.join(process.cwd(), 'secrets', 'credentials.json');
const TOKEN_PATH = path_1.default.join(process.cwd(), 'secrets', 'token.json');
async function authorize() {
    let client = await loadSavedCredentialsIfExist();
    if (client)
        return client;
    const content = await promises_1.default.readFile(CREDENTIALS_PATH, 'utf8');
    const credentials = JSON.parse(content);
    const { client_secret, client_id } = credentials.installed;
    const oAuth2Client = new googleapis_1.google.auth.OAuth2(client_id, client_secret, 'http://localhost:3000/oauth2callback');
    const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: [
            'https://www.googleapis.com/auth/gmail.readonly',
            'https://www.googleapis.com/auth/gmail.modify',
        ],
    });
    await (0, open_1.default)(authorizeUrl);
    const server = http_1.default.createServer(async (req, res) => {
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
            await saveCredentials(oAuth2Client);
        }
    }).listen(3000);
    (0, server_destroy_1.default)(server);
    return new Promise(resolve => {
        server.on('close', () => {
            resolve(oAuth2Client);
        });
    });
}
async function loadSavedCredentialsIfExist() {
    try {
        const content = await promises_1.default.readFile(TOKEN_PATH, 'utf8');
        const credentials = JSON.parse(content);
        return googleapis_1.google.auth.fromJSON(credentials);
    }
    catch {
        return null;
    }
}
async function saveCredentials(client) {
    const content = await promises_1.default.readFile(CREDENTIALS_PATH, 'utf8');
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = {
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    };
    await promises_1.default.writeFile(TOKEN_PATH, JSON.stringify(payload));
}
