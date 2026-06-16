# Career Save Bridge Note

The career save bridge is now in place while `App.tsx` remains too large for a risky full rewrite.

## Current Behaviour

- `saveLocalSeason()` preserves existing career fields when no explicit career fields are passed.
- This prevents autosave from wiping future multi-season data.
- `CareerStatusPanel` can read the current local save when no `careerState` prop is passed.
- Board & Finance can therefore display saved career data without full app-shell wiring yet.

## Protected Career Fields

- `currentSeason`
- `careerPhase`
- `careerHistory`

## Why This Bridge Exists

`App.tsx` still owns navigation, save effects, import/reset handlers, simulation state and screen rendering. A full direct rewrite is risky while the file is oversized.

This bridge lets career data survive autosave and become visible before the full App state refactor.

## Remaining Work

- Add real `careerState` state inside `App.tsx`.
- Pass `careerState` into `BoardFinanceScreen` directly.
- Reset `careerState` on new franchise/reset.
- Restore `careerState` after save import.
- Use `createNextSeasonState()` for the real Start Next Season action.
