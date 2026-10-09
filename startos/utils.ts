export const uiPort = 3000

// bitcoind's own RPC listener, reachable only over the LXC bridge. The
// public `rpc` host fronts btc-rpc-proxy instead, which would restrict the
// methods Click Miner needs (getblocktemplate / submitblock).
export const bitcoindRpcHostId = 'rpc-local'
export const bitcoindRpcPortLocal = 58332

// bitcoind's `main` volume is its datadir; the RPC cookie sits at its root and
// is regenerated on every bitcoind start (Click Miner re-reads it per request).
export const btcMountpoint = '/mnt/bitcoind'
export const btcCookiePath = `${btcMountpoint}/.cookie`
