# acbc-mods

Claude Code mods.

## Mods

### dollar

Skill autocomplete anywhere in the prompt.

- `$skill` anywhere → skills-only autocomplete, invoked on submit.
- `/skill` mid-text → same. A leading `/` stays Claude Code's own.

Skills with `disable-model-invocation` can't be invoked this way; run those as `/skill` at the start.

```
/plugin install dollar --marketplace acbcdev/mods
```

`y` to add the marketplace, then pick a scope.

### ding

Sound when Claude needs you.

- Needs attention (permission prompt, idle waiting on input) → `Ping`.
- Turn ends → `Glass`.

macOS only (plays via `afplay`).

```
/plugin install ding --marketplace acbcdev/mods
```
