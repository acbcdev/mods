import { test, expect } from 'claude-code/testing'

test('Notification pings, Stop glasses', async ($, on) => {
  const played: string[] = []
  on('audio.play', async (_$, e) => { played.push(e.clip.asset!); return { value: undefined } })
  on('classic.Notification', async () => ({}))
  on('classic.Stop', async () => ({}))
  await $.classic.Notification({ message: 'needs input', notification_type: 'permission_prompt' })
  await $.classic.Stop({})
  expect(played).toEqual(['sounds/Ping.aiff', 'sounds/Glass.aiff'])
})
