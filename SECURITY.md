# Security hardening

- User input is treated as untrusted data and bounded before storage/rendering.
- Control characters are removed from text input.
- Persisted JSON must be validated before use and malformed data falls back safely.
- User content must never be injected as raw HTML or executable code.
- Release signing material is supplied only through GitHub Actions secrets.
- Signing files, build output, environment files, and dependencies are excluded from Git.
- GitHub Actions use least-privilege permissions where possible.
- Temporary release signing files are removed after the release step.
