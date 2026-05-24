# Career Loop Vertical Slice

This is the next milestone before Steam work.

The target is a complete playable loop:

New Career -> Regular Season -> Playoffs -> Season Summary -> Offseason -> Next Season.

This is smaller than full Steam readiness, but it proves the game is a real multi-season management sim.

## Goal

The player should be able to start a career, play through one full season, complete playoffs, enter offseason, process rollover changes, and start season two without the game breaking or losing state.

## Current State

Already present:

- Team selection.
- Regular season fixtures.
- Match simulation.
- League table.
- Playoffs.
- Season summary.
- Offseason model helpers.
- Offseason screen component.
- Career save model types.
- Local save/export/import.

Not fully connected yet:

- Offseason is not part of the actual save loop.
- Next season is not generated.
- Career season number is not persisted.
- Champion history is not archived.
- Contract rollover is not save-backed.
- Player ageing is not applied through UI action.
- Staff is visible but not save-backed.

## Phase 1: Make Offseason Visible Safely

Required:

- Add offseason preview to Season Summary.
- Show locked offseason state before champion exists.
- Show full offseason preview once champion exists.
- Avoid App.tsx changes if possible.

Success condition:

- Player can see offseason planning after completing playoffs.

## Phase 2: Add Career Progression Utility

Create a utility that takes the current season state and returns next-season state.

Required helper should handle:

- Increase season number.
- Clear regular-season results.
- Clear playoff results.
- Progress player ages.
- Progress contract years.
- Archive champion.
- Archive standings.
- Archive results.
- Reset condition/development reports.
- Reset training if needed.

Success condition:

- A pure function can create next season state without touching React.

## Phase 3: Add Start Next Season Action

Required:

- Button in offseason/season summary.
- Calls rollover helper.
- Updates app state.
- Returns player to Dashboard.
- Save persists after rollover.

Success condition:

- Player can finish Season 1 and begin Season 2.

## Phase 4: Save Model Upgrade

Required:

- Persist currentSeason.
- Persist career history.
- Persist career phase.
- Preserve backwards compatibility with old saves.
- Save migration if fields are missing.

Success condition:

- Reloading after offseason still shows correct season/history.

## Phase 5: First Multi-Season Test

Manual test:

1. Start new franchise.
2. Simulate regular season.
3. Simulate playoffs.
4. View summary.
5. Start offseason.
6. Start next season.
7. Simulate at least one Season 2 fixture.
8. Reload page.
9. Confirm Season 2 state remains.

Success condition:

- No crashes.
- No lost state.
- No impossible data.

## Phase 6: Polish The Loop

Required:

- Better offseason copy.
- Clear next-season confirmation.
- Season number visible in header.
- Champion history visible.
- Contract expiry impact clear.
- Player ageing report clear.

Success condition:

- The loop feels intentional, not like a debug tool.

## Next Recommended Code Step

Create `src/game/careerRollover.ts`.

It should be a pure utility file first. Do not wire it into App.tsx until it builds cleanly.
