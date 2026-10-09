# Updating Click Miner

1. Tag and publish a new upstream image (`v*` tag in `owencoles/click-miner` triggers `.github/workflows/docker-publish.yml`).
2. In `startos/manifest/index.ts`, bump the `dockerTag` to the new version.
3. In `startos/versions/current.ts`, set `version` to `<upstream version>:0` (reset the revision on an upstream bump, increment it for wrapper-only changes) and update the release notes.
4. If the new version changes env vars (see upstream `server/settings.js`), update `startos/main.ts` and the README.
5. `make x86` (or `make arm`), sideload, and run the full install / start / UI / backup / uninstall test.
