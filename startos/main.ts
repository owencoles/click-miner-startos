import { T } from '@start9labs/start-sdk'
import { i18n } from './i18n'
import { sdk } from './sdk'
import {
  bitcoindRpcHostId,
  bitcoindRpcPortLocal,
  btcCookiePath,
  btcMountpoint,
  uiPort,
} from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Click Miner!'))

  // Address of bitcoind on the LXC bridge, as `<ip>:<port>`. No credentials
  // are stored by this package: the app reads bitcoind's RPC cookie from the
  // read-only dependency mount below.
  const rpcAddr = await sdk.host
    .getBridgeAddress(effects, {
      packageId: 'bitcoind',
      hostId: bitcoindRpcHostId,
      internalPort: bitcoindRpcPortLocal,
      fallbackPort: bitcoindRpcPortLocal,
    })
    .const()
  const sep = rpcAddr.lastIndexOf(':')

  return sdk.Daemons.of(effects).addDaemon('primary', {
    subcontainer: await sdk.SubContainer.of(
      effects,
      { imageId: 'click-miner' },
      sdk.Mounts.of()
        .mountVolume({
          volumeId: 'main',
          subpath: null,
          mountpoint: '/data',
          readonly: false,
        })
        .mountDependency<T.SDKManifest>({
          dependencyId: 'bitcoind',
          volumeId: 'main',
          subpath: null,
          mountpoint: btcMountpoint,
          readonly: true,
        }),
      'click-miner-sub',
    ),
    exec: {
      // Bypass the image's entrypoint: it starts a bundled Tor client that is
      // only needed to reach .onion RPC hosts, which StartOS doesn't use here.
      command: ['node', 'server/index.js'],
      cwd: '/app',
      user: 'root',
      env: {
        PORT: String(uiPort),
        HOST: '0.0.0.0',
        DATA_DIR: '/data',
        RPC_HOST: rpcAddr.slice(0, sep),
        RPC_PORT: rpcAddr.slice(sep + 1),
        RPC_COOKIE_PATH: btcCookiePath,
      },
    },
    ready: {
      display: i18n('Web Interface'),
      fn: () =>
        sdk.healthCheck.checkPortListening(effects, uiPort, {
          successMessage: i18n('The web interface is ready'),
          errorMessage: i18n('The web interface is not ready'),
        }),
    },
    requires: [],
  })
})
