# Contributing to PEP Pay

Contributions are welcome: bug reports, reproducible test cases, documentation, translations and code improvements.

## Before opening an issue

- Search existing issues first.
- Include your browser, operating system and wallet version where relevant.
- Never post seed phrases, private keys, full wallet backups or private personal information.
- Do not publish a real receiving address unless you explicitly intend it to be public.

## Pull requests

1. Fork the repository and create a focused branch.
2. Keep changes small and explain the reason for the change.
3. Run `npm install` and `npm run build`.
4. Test the demo with a test wallet or a safe test amount. Never assume an unverified wallet URI is supported.
5. Update the English, German and Chinese documentation when user-facing behavior changes.

## Scope

PEP Pay is a self-hosted payment-request widget. Contributions should preserve its core principles: no registration, no custody, no central payment processing, no mandatory fees, no reservation system and no automatic payment confirmation.

Do not add telemetry, remote payment APIs, wallet connection requests or collection of personal data without explicit project discussion and maintainer review.

By submitting a contribution, you agree that it may be distributed under the project's MIT License.
