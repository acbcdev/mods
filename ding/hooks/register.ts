import type { Register } from 'claude-code'

const glass = { asset: 'sounds/Glass.aiff' }

// classic.Stop is the main loop only (subagents raise SubagentStop), so no filtering needed.
export const register: Register = on => {
  on('classic.Notification', async ($, e, next) => {
    $.audio.play({ asset: 'sounds/Ping.aiff' }).catch(() => {})
    return next(e)
  }).catch(($, e, next) => next(e))
  on('classic.Stop', async ($, e, next) => {
    // ponytail: double Glass = longer end sound without a new asset
    $.audio.play(glass).catch(() => {})
    setTimeout(() => $.audio.play(glass).catch(() => {}), 400)
    return next(e)
  }).catch(($, e, next) => next(e))
}
