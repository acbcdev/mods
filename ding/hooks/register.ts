import type { Register } from 'claude-code'

// classic.Stop is the main loop only (subagents raise SubagentStop), so no filtering needed.
export const register: Register = on => {
  on('classic.Notification', async ($, e, next) => {
    $.audio.play({ asset: 'sounds/Ping.aiff' }).catch(() => {})
    return next(e)
  }).catch(($, e, next) => next(e))
  on('classic.Stop', async ($, e, next) => {
    $.audio.play({ asset: 'sounds/Glass.aiff' }).catch(() => {})
    return next(e)
  }).catch(($, e, next) => next(e))
}
