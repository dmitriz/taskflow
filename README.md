# Taskflow: Gmail Task Capture System

Taskflow is a Node.js-based automation tool designed to capture tasks from Gmail emails and append them to a `tasks.md` file. It is built with modern JavaScript/TypeScript practices and integrates with the Gmail API for seamless task extraction and management.

## Features

- **Email-to-Task Automation**: Automatically fetches self-sent, unread emails and converts them into tasks.
- **Configurable Settings**: Adjust the number of emails to fetch, signature separators, and task formatting via a centralized configuration file.
- **Signature Removal**: Strips email signatures based on a configurable separator.
- **Task Formatting**: Ensures tasks are appended with consistent formatting and spacing.
- **Code Coverage and Testing**: Includes unit and integration tests with Vitest and Nock for robust testing.
- **OAuth2 Integration**: Securely connects to Gmail using OAuth2 for email access.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/dmitriz/taskflow.git
   cd taskflow
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up Gmail API credentials:

   - Place your `credentials.json` and `token.json` files in the `secrets/` directory.

4. Build the project:

   ```bash
   npm run build
   ```

## Usage

### Running the Taskflow Script

To fetch emails and append tasks to `tasks.md`, run:

```bash
npm start
```

### Configuration

Modify the `config.ts` file to adjust settings such as:

- `MAX_EMAILS_TO_FETCH`: Maximum number of emails to process.

- `NEWLINES_AFTER_TASK`: Number of newlines to append after each task.

- `SIGNATURE.SEPARATOR`: Text used to identify and remove email signatures.

### Testing

Run the test suite with:

```bash
npm test
```

Generate a coverage report:

```bash
npm run coverage
```

## Project Structure

- **`auth.ts`**: Handles OAuth2 authentication with Gmail.
- **`email-processor.ts`**: Fetches and processes emails from Gmail.
- **`tasks-writer.ts`**: Appends tasks to the `tasks.md` file.
- **`remove-signature.ts`**: Removes email signatures based on a separator.
- **`config.ts`**: Centralized configuration for the project.
- **`tasks.md`**: Stores the appended tasks.
- **`secrets/`**: Contains `credentials.json` and `token.json` for Gmail API access.

## Development

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm 7+

### Building the Project

Compile TypeScript files to JavaScript:

```bash
npm run build
```

### Linting

Ensure code quality with:

```bash
npm run lint
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature
   ```

3. Commit your changes:

   ```bash
   git commit -m "Add your feature"
   ```

4. Push to your branch:

   ```bash
   git push origin feature/your-feature
   ```

5. Open a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgments

- [Google APIs Node.js Client](https://github.com/googleapis/google-api-nodejs-client)
- [Vitest](https://vitest.dev/)
- [Nock](https://github.com/nock/nock)