import { test, expect } from 'claude-code/testing'
import { skillRefs } from './register'

test('finds known $skills anywhere, ignores env vars and dupes', () => {
  const names = new Set(['deploy', 'caveman:caveman'])
  expect(skillRefs('please $deploy then $caveman:caveman, echo $HOME $deploy', names)).toEqual(['deploy', 'caveman:caveman'])
  expect(skillRefs('cost$deploy', names)).toEqual([])
  expect(skillRefs('echo $HOME', names)).toEqual([])
  expect(skillRefs('run /deploy and ls /tmp', names)).toEqual(['deploy'])
  expect(skillRefs('/deploy now', names)).toEqual([])
})
