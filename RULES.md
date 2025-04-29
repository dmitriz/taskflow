# Project Coding Standards and Principles

This document defines the general coding rules, architectural principles, and technology agreements for the Gmail Task Capture system.

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

## Section 3: Email Processing Logic

- Only self-sent, unread emails are fetched using the query: `is:unread from:me to:me`.
- The maximum number of emails to fetch is configurable in the config file.
- Only plaintext email bodies are extracted; HTML is ignored.
- Signatures are removed based on a configurable separator text (e.g., "Best wishes").
- Original paragraph formatting inside emails is preserved.
- Tasks are separated by two newlines between entries.

## Section 4: Testing Standards

- Vitest is used for all testing.
- Nock is used for mocking Gmail API HTTP requests.
- Pure unit tests are created for internal modules:
  - `remove-signature.ts`
  - `tasks-writer.ts`
- Integration tests simulate full email capture using Nock without contacting real Gmail servers.

## Section 5: Coverage and Reporting

- Code coverage is enabled using `c8` via Vitest.
- Coverage is available in both text output and HTML reports.
- The coverage folder is excluded from Git via `.gitignore`.

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

---

**Final Note**:  
This project is designed for maximum automation, minimalism, reliability, and future publishing readiness.
