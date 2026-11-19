import type { Register } from 'claude-code'

const glass = { asset: 'sounds/Glass.aiff' }

// classic.Stop is the main loop only (subagents raise SubagentStop), so no filtering needed.
export const register: Register = on => {
  on('classic.Notification', async ($, e, next) => {
    $.audio.play({ asset: 'sounds/Ping.aiff' }).catch(() => {})
    return next(e)
  }).catch(($, e, next) => next(e))
  on('classic.Stop', async ($, e, next) => {
    // ponytail: triple Glass = longer end sound without a new asset
    for (let i = 0; i < 3; i++) setTimeout(() => $.audio.play(glass).catch(() => {}), i * 400)
    return next(e)
  }).catch(($, e, next) => next(e))
}
