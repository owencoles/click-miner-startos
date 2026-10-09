# Click Miner on StartOS

> Everything not listed in this document behaves the same as upstream Click Miner. See the
> [upstream README](https://github.com/owencoles/click-miner#readme) for features, security
> model, and environment variables.

[Click Miner](https://github.com/owencoles/click-miner) is an educational, open-source
"manual Bitcoin miner." Each click builds one real block header from a connected node's
`getblocktemplate`, hashes it once with SHA256d, and compares it to the network target.

- **Upstream repo:** <https://github.com/owencoles/click-miner>
- **Wrapper repo:** <https://github.com/owencoles/click-miner-startos>

## Image and Container Runtime

| Property      | Value                                |
| ------------- | ------------------------------------ |
| Image         | `ghcr.io/owencoles/click-miner:0.1.0` (upstream, unmodified) |
| Architectures | x86_64, aarch64                      |
| Command       | `node server/index.js` (as `root`, cwd `/app`) |

The image's own entrypoint is bypassed. It only starts a bundled Tor client for `.onion` RPC hosts, which is unused on StartOS.

| Subcontainer      | Purpose                    |
| ----------------- | -------------------------- |
| `click-miner-sub` | The `primary` daemon       |

## Volume and Data Layout

| Volume | Mount Point | Purpose                                                    |
| ------ | ----------- | ---------------------------------------------------------- |
| `main` | `/data`     | `config.json` (payout address; written `0600` by the app)  |

Bitcoin Core's `main` volume is additionally mounted **read-only** at `/mnt/bitcoind` so the app can read its RPC cookie.

## Dependencies

| Dependency | Kind    | Health checks | Why                                   |
| ---------- | ------- | ------------- | ------------------------------------- |
| `bitcoind` | running | `bitcoind`    | Block templates and `submitblock`     |

No credentials are stored by this package. The app is pointed at bitcoind's bridge-only `rpc-local` binding (port `58332`, resolved with `sdk.host.getBridgeAddress`) and authenticates with the cookie at `/mnt/bitcoind/.cookie` (`RPC_COOKIE_PATH`). The cookie is regenerated on each bitcoind start, and the app re-reads it on every request.

## Network Access and Interfaces

| Interface | Port | Protocol | Purpose  |
| --------- | ---- | -------- | -------- |
| `ui`      | 3000 | http     | Web UI   |

## Installation and First-Run Flow

1. Install with Bitcoin Core as a dependency.
2. Open the Web UI, then Settings, and enter a payout address.

There are no actions and no StartOS-side configuration.

## Health Checks

| Daemon    | Check                    |
| --------- | ------------------------ |
| `primary` | Port 3000 is listening   |

## Backups and Restore

The `main` volume is backed up. It contains only `config.json` (the payout address).

## Limitations and Differences

- The app only accepts requests whose `Host` header is a private name (`.local`, `.onion`, `.localhost`, private IPs, single-label names). A custom public domain is refused unless `ALLOWED_HOSTS` is set, and this package does not currently expose that setting.
- No Tor client is bundled in the running service, so a `.onion` RPC host is not reachable. This is not needed, since the node is a StartOS dependency.

## Quick Reference for AI Consumers

```yaml
package_id: click-miner
image: ghcr.io/owencoles/click-miner:0.1.0
ports: { ui: 3000 }
volumes: { main: /data }
dependencies: { bitcoind: running }
env:
  RPC_HOST: <bridge ip of bitcoind rpc-local>
  RPC_PORT: 58332
  RPC_COOKIE_PATH: /mnt/bitcoind/.cookie
actions: []
```
