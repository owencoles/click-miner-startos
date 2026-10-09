import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'click-miner',
  title: 'Click Miner',
  license: 'MIT',
  packageRepo: 'https://github.com/owencoles/click-miner-startos',
  upstreamRepo: 'https://github.com/owencoles/click-miner',
  marketingUrl: 'https://github.com/owencoles/click-miner',
  donationUrl: null,
  description: { short, long },
  volumes: ['main'],
  images: {
    'click-miner': {
      source: { dockerTag: 'ghcr.io/owencoles/click-miner:0.1.0' },
      arch: ['x86_64', 'aarch64'],
    },
  },
})
