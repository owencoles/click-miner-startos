# Click Miner

Click Miner is an educational "manual Bitcoin miner." Each click assembles one real block header from your own node's live data and computes a single SHA256d hash against the current network target. It will essentially never find a block. It exists to show what a miner does, one hash at a time.

## Getting set up

1. Make sure **Bitcoin Core** is installed and running. Click Miner depends on it, and StartOS will prompt you to install it if it is missing.
2. Open Click Miner's **Dashboard** tab and launch the **Web UI**.
3. Go to the **Settings** tab and enter your **payout address**. Any address type works. This is the only setup step.

The connection to your node is automatic. Click Miner reads Bitcoin Core's RPC cookie directly, so you never enter or store an RPC username or password.

## What happens if you find a block

If a hash beats the network target, Click Miner submits the block to your node with `submitblock`, and the block reward is paid to your payout address. The odds are astronomically small.

Click Miner never holds, generates, or touches a private key. It only needs a public address.

## Limitations

- Click Miner has no login. Anyone who can reach its web interface can change the payout address. Use StartOS's normal access controls (LAN, Tor, or VPN) and don't expose it publicly.
- The web interface accepts connections only from private hostnames (`.local`, `.onion`, LAN and Tailscale addresses, `localhost`). If you reach your server through a custom public domain, the interface will refuse the request.
- Click Miner needs a running Bitcoin Core node. Other node implementations are not supported on StartOS.
- Not a pool, not competitive, not financial advice.
