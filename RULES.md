# Gmail Task Capture: Coding Standards and Principles

- [Section 1: Code Organization](#section-1-code-organization)
- [Section 2: API Integration](#section-2-api-integration)
- [Section 3: Email Processing Logic](#section-3-email-processing-logic)

## Section 3: Email Processing Logic

- Emails are fetched using the Gmail API.
- Tasks are extracted from email bodies based on predefined patterns.
- Duplicate tasks are filtered out before appending to `tasks.md`.
- Errors during email processing are logged for debugging purposes.
- [Section 4: Testing Standards](#section-4-testing-standards)
- [Section 5: Coverage and Reporting](#section-5-coverage-and-reporting)
- [Section 6: Project Cleanliness Rules](#section-6-project-cleanliness-rules)
- [Section 7: Copilot Prompting Standards](#section-7-copilot-prompting-standards)

## Section 1: Code Organization

- The project uses Node.js and TypeScript (light TS, minimal noise).
- All secrets must be stored inside a `secrets` folder, not as loose files.
- Tasks are appended to a `tasks.md` file in plain text format.
- Environment artifacts like `coverage`, `tasks.md`, and `secrets` must be excluded via `.gitignore`.

## Section 2: API Integration

- Gmail API access is handled via OAuth2 using the `googleapis` package.
- A local HTTP server listens on `localhost:3000` for OAuth2 redirects.
- Only the minimum necessary OAuth scopes are requested:
  - `https://www.googleapis.com/auth/gmail.readonly`
  - `https://www.googleapis.com/auth/gmail.modify`
- Processed emails are marked as read after task extraction.
- Tasks are separated by a configurable number of newlines, defined in `SETTINGS.NEWLINES_AFTER_TASK` within `config.ts`.
- The maximum number of emails to fetch is configurable in the config file.
- Only plaintext email bodies are extracted; HTML is ignored.
- Signatures are removed based on a configurable separator text (e.g., "Best wishes").
- Original paragraph formatting inside emails is preserved.
- Tasks are separated by configurable newlines between entries, as defined in `SETTINGS.NEWLINES_AFTER_TASK`.

## Section 4: Testing Standards

- Vitest is used for all testing.
- Nock is used for mocking Gmail API HTTP requests.
- Pure unit tests are created for internal modules:
  - `remove-signature.ts`
  - `tasks-writer.ts`
- Integration tests simulate full email capture using Nock without contacting real Gmail servers.

## Section 5: Coverage and Reporting

- Code coverage is enabled using `c8` via `Vitest`.
- Coverage is available in both text output and HTML reports.
- The `coverage` folder is excluded from Git via `.gitignore`.

## Section 6: Project Cleanliness Rules

- No magic constants in code. All configurable values must reside in `config.ts` using Enums.
- Minimalistic, clear imports.
- Functions must be short, direct, and single-responsibility.
- No hardcoded values outside of configuration.
- Automation should run without manual human intervention.

## Section 7: Copilot Prompting Standards

- Copilot prompts must request:
  - Create the following files with exactly this content.
  - Each file listed by name.
  - Code blocks annotated with the correct language (e.g., `json`, `bash`, `typescript`).
  - No explanations, no extra conversation, no ending notes.
- Content must be ready for direct Copilot parsing without manual corrections.

### Example Prompt

```json
{
  "file": "example.js",
  "content": "console.log('Hello, world!');"
}
```

## Final Note

This project is designed for maximum automation, minimalism, reliability, and future publishing readiness.
