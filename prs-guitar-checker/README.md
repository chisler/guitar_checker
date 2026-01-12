# PRS Guitar Year Identifier

An unofficial web application to identify PRS guitar models and manufacturing years from serial numbers.

## Features

- Identify PRS guitars by serial number
- Supports all PRS models including:
  - Set-Neck (Standard) models (Custom 24, McCarty, Santana, etc.)
  - CE Models (1988-2008 and 2016+)
  - S2 Series
  - SE Models (Korea and Indonesia)
  - Acoustic guitars
  - Bass models
  - Amplifiers and Speaker Cabinets
- Real-world examples from PRS forums and listings
- Comprehensive stress test suite (212+ test cases)

## Development

### Running the Application

```bash
npm install
npm run dev
```

### Testing

Run the stress test suite:

```bash
npm test
```

The stress test runs automatically as a pre-commit hook to ensure identification logic is working correctly.

### Pre-commit Hook

A pre-commit hook is configured to run the stress test before each commit. If tests fail, the commit will be blocked.

To manually test the hook:

```bash
cd prs-guitar-checker
node scripts/pre-commit-test.js
```

## Disclaimer

This is an **unofficial** tool and is not affiliated with or endorsed by PRS Guitars. For the most accurate and comprehensive information, always refer to the [Official PRS Year Identification Guide](https://support.prsguitars.com/hc/en-us/articles/4408314427547-Year-Identification).

## Contributing

Found an issue or want to improve the algorithm? Contact [Alexander Chisler](mailto:alexander.chisler@gmail.com).

When reporting issues, please include:
- The serial number in question
- The model type (if known)
- The expected year (if known)
- Any relevant context

## License

MIT
