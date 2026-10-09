import { i18n } from './i18n'
import { sdk } from './sdk'

const bitcoind = sdk.Dependency.required('bitcoind', {
  description: i18n(
    "Click Miner builds its block templates from, and submits blocks to, your node's RPC interface",
  ),
  metadata: {
    title: 'Bitcoin Core',
    icon: 'https://raw.githubusercontent.com/Start9Labs/bitcoin-core-startos/master/icon.svg',
  },
  versionRange:
    '(>=28.4:17 && <29) || (>=29.4:4 && <30) || (>=30.3:4 && <31) || >=31.1:4',
  kind: 'running',
  healthChecks: ['bitcoind'],
})

export const dependencies = sdk.Dependencies.of().addDependency(bitcoind)
