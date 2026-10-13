import type { Engine, Register } from 'claude-code'

// ponytail: CommandInfo has no "skill" kind; non-builtin, non-MCP is the closest filter
// (also lists plugin/user slash commands). Tighten if the engine adds a skill source.
const skills = async ($: Engine) =>
  (await $.command.list()).filter(c => c.source !== 'builtin' && c.source !== 'mcp')

// `$name` anywhere, or `/name` past the start (a leading `/` is the engine's own),
// that are known skills; `$HOME`, `/tmp` and friends ignored.
export const skillRefs = (text: string, names: Set<string>) =>
  [...new Set([...text.matchAll(/(?:^\$|\s[$/])([\w:.-]+)/g)].map(m => m[1]))].filter(n => names.has(n))

export const register: Register = on => {
  on('prompt.autocomplete', { token: /^[$/]/ }, async ($, e, next) => {
    const [lead, q] = [e.token[0], e.token.slice(1).toLowerCase()]
    if (lead === '/' && e.start === 0) return next(e)
    const mine = (await skills($))
      .filter(c => c.name.toLowerCase().includes(q))
      .map(c => ({ text: `${lead}${c.name} `, label: `${lead}${c.name}`, description: c.description }))
    return { suggestions: [...mine, ...(await next(e)).suggestions] }
  })

  on('prompt.submit', async ($, e, next) => {
    const used = skillRefs(e.text, new Set((await skills($)).map(c => c.name)))
    if (!used.length) return next(e)
    const note = `The user referenced these skills inline: ${used.join(', ')}. Invoke each with the Skill tool before answering.`
    return next({ ...e, context: [...(e.context ?? []), note] })
  }).catch(($, e, next) => next(e))
}
