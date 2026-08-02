# Band Memo

Xiaomi Vela JS / AIoT-toolkit 2.x project.

## Local checks

```bash
npm ci
npm test
```

## Build an RPK

The release script uses the project-local command supplied by AIoT-toolkit 2.0.5:

```bash
npm run release
```

The resulting `.rpk` is expected under `dist/`.

## GitHub Actions

- `.github/workflows/ci.yml` runs tests on pushes, pull requests, and manual runs.
- `.github/workflows/release-rpk.yml` builds a release RPK for tags such as `v1.0.1` or via manual dispatch.

For release signing, configure these GitHub Actions secrets:

- `RELEASE_PRIVATE_PEM`
- `RELEASE_CERTIFICATE_PEM`

The workflow writes them to `sign/release/private.pem` and `sign/release/certificate.pem`.

## Important

The original archive contained tests and application logic, but its page files were not in the Vela `.ux` page format required by the current AIoT-toolkit 2.x workflow. The pages were normalized to `.ux` files and `manifest.json` was completed with package metadata, routing, device type, and `system.storage`.

The exact RPK compilation cannot be executed in this environment because the AIoT-toolkit package is not available from the execution environment's npm mirror. The GitHub workflow therefore uses the official `aiot-toolkit@2.0.5` package through `npx` at build time.
