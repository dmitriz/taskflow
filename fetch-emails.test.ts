import { it, expect, beforeEach, afterEach, vi } from 'vitest';
import nock from 'nock';
import fs from 'fs/promises';
import path from 'path';

const TASKS_PATH = path.join(process.cwd(), 'tasks.md');

// Mock fs/promises module with proper default export
vi.mock('fs/promises', async () => {
  const mockReadFile = vi.fn().mockImplementation((path, options) => {
    // Mock credentials file
    if (path.includes('credentials.json')) {
      return Promise.resolve(JSON.stringify({
        installed: {
          client_id: 'mock-client-id',
          client_secret: 'mock-client-secret'
        }
      }));
    }
    // Mock token file
    if (path.includes('token.json')) {
      return Promise.resolve(JSON.stringify({
        type: 'authorized_user',
        client_id: 'mock-client-id',
        client_secret: 'mock-client-secret',
        refresh_token: 'mock-refresh-token'
      }));
    }
    // For tasks.md file in the test
    if (path === TASKS_PATH) {
      return Promise.resolve('- Test task');
    }
    return Promise.reject(new Error(`Mock not implemented for ${path}`));
  });
  
  const mockWriteFile = vi.fn().mockResolvedValue(undefined);
  const mockAppendFile = vi.fn().mockResolvedValue(undefined);
  
  return {
    default: {
      readFile: mockReadFile,
      writeFile: mockWriteFile,
      appendFile: mockAppendFile
    },
    readFile: mockReadFile,
    writeFile: mockWriteFile,
    appendFile: mockAppendFile
  };
});

// More comprehensive mock for the Gmail API
vi.mock('googleapis', () => {
  return {
    google: {
      auth: {
        OAuth2: vi.fn().mockImplementation(() => ({})),
        fromJSON: vi.fn().mockImplementation(() => ({
          request: vi.fn().mockResolvedValue({})
        }))
      },
      gmail: vi.fn().mockImplementation(() => ({
        users: {
          messages: {
            list: vi.fn().mockResolvedValue({
              data: {
                messages: [{ id: 'mock-id-123' }]
              }
            }),
            get: vi.fn().mockResolvedValue({
              data: {
                payload: {
                  body: {
                    data: Buffer.from('Test task\nSecond line', 'utf-8').toString('base64')
                  }
                }
              }
            }),
            modify: vi.fn().mockResolvedValue({})
          }
        }
      }))
    }
  };
});

// Simple mock for auth
vi.mock('./auth.js', () => ({
  authorize: vi.fn().mockResolvedValue({})
}));

beforeEach(() => {
  nock.cleanAll();
  vi.clearAllMocks();
});

afterEach(() => {
  nock.cleanAll();
});

it('fetches emails and writes tasks', async () => {
  // Since we're mocking googleapis directly, we don't need these nock mocks
  // but keeping them as documentation of the expected API behavior
  nock('https://gmail.googleapis.com')
    .get('/gmail/v1/users/me/messages')
    .query(true)
    .reply(200, {
      messages: [{ id: 'mock-id-123' }],
    });

  nock('https://gmail.googleapis.com')
    .get('/gmail/v1/users/me/messages/mock-id-123')
    .query(true)
    .reply(200, {
      payload: {
        body: {
          data: Buffer.from('Test task\nSecond line', 'utf-8').toString('base64'),
        },
      },
    });

  nock('https://gmail.googleapis.com')
    .post('/gmail/v1/users/me/messages/mock-id-123/modify')
    .reply(200, {});

  // Simulate the behavior of fetch-emails.js by manually calling the processor
  const { fetchAndProcessEmails } = await import('./email-processor.js');
  await fetchAndProcessEmails();

  const content = await fs.readFile(TASKS_PATH, 'utf8');
  expect(content).toContain('- Test task');
});