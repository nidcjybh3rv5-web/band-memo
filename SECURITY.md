# Security review notes

The original project is preserved. The migration adds a Vela source tree without deleting the original files.

Hardening applied:
- bounded and normalized user text;
- validation of persisted note objects before use;
- bounded persisted JSON size;
- safe index validation;
- updates only accept title/content changes rather than arbitrary object fields;
- no hard-coded signing private key or certificate;
- GitHub Actions release permissions are limited to repository contents write access;
- signing material is created from Actions secrets, chmod 600, and removed after the job;
- build output, signing files, dependency folders, and environment files are ignored by Git.

Not claimed:
- A static review cannot prove absence of every vulnerability.
- The RPK compiler itself must still be run in AIoT-IDE or GitHub Actions.
