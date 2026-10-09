export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting Click Miner!': 0,
  'Web Interface': 1,
  'The web interface is ready': 2,
  'The web interface is not ready': 3,

  // interfaces.ts
  'Web UI': 4,
  'The Click Miner web interface': 5,

  // dependencies.ts
  "Click Miner builds its block templates from, and submits blocks to, your node's RPC interface": 6,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
