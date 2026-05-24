# Steam Game Loop Roadmap

This document defines the path from browser prototype to Steam-suitable basketball management game.

The game should not become a collection of disconnected dashboard screens. It should become a complete management loop:

Main Menu -> New Save -> Season -> Playoffs -> Offseason -> Next Season -> History.

## Current Status

Hardwood Dynasty currently works as a browser-based basketball management prototype.

It has:

- Fictional league and teams.
- Team selection.
- Roster management.
- Tactics.
- Training.
- Match simulation.
- League table.
- Playoffs.
- Contracts.
- Free agents.
- Board and finance.
- Local save/export/import.

It is not yet Steam-ready because it does not yet have a full multi-season game loop, save slots, desktop packaging, or enough game event moments.

## Steam-Suitable End State

The finished version should feel like a desktop management game, even if it also runs in a browser.

Target loop:

1. Open game.
2. Main menu.
3. Continue save, load save, or start new career.
4. Choose league/team/custom club.
5. Play through regular season.
6. Handle inbox decisions, tactics, rotation, training, contracts and recruitment.
7. Reach playoffs.
8. Crown champion.
9. Enter offseason.
10. Process player ageing, contract expiry, development/regression, retirements and free agents.
11. Generate next season.
12. Update historical records.
13. Continue career.

## Phase 1: Stabilise and Refactor

Goal: make the codebase safe enough for bigger game systems.

Required:

- Keep Vercel green after each change.
- Avoid large App.tsx rewrites.
- Extract shared app types.
- Extract shared app config.
- Extract shared app helpers.
- Extract DashboardView.
- Switch App.tsx to imported DashboardView when safe.
- Remove temporary global compatibility bridges.

Success condition:

- App.tsx is smaller and less risky.
- No temporary globals remain.
- Vercel stays green.

## Phase 2: Proper Main Menu and Save Management

Goal: make startup feel like a game, not a website landing page.

Required:

- Main Menu screen.
- Continue Career.
- New Career.
- Load Save.
- Settings.
- Credits/version panel.
- Save slots.
- Rename save.
- Delete save.
- Export/import save from save menu.

Success condition:

- Player starts from a proper game menu.
- Save management feels intentional.

## Phase 3: Career Save Model

Goal: replace one-season save thinking with a career save structure.

Required:

- Save versioning.
- Current season number.
- Current phase: preseason, regular season, playoffs, offseason.
- Managed team state.
- League teams.
- Results.
- Playoff results.
- Contracts.
- Training/tactics/rotation.
- Historical seasons.
- Champion history.
- Award history later.

Success condition:

- The game knows where the player is in a long-running career.

## Phase 4: Offseason

Goal: create the bridge from one season to the next.

Required offseason steps:

1. Season recap.
2. Player ageing.
3. Development and regression.
4. Contract years tick down.
5. Expiring players become free agents.
6. Retirements later.
7. Free agent market refresh.
8. Youth/rookie intake later.
9. Board objectives refresh.
10. New fixture generation.
11. Start next season.

Success condition:

- Winning a season is not the end of the game.
- The player can continue into another season with consequences.

## Phase 5: History and Legacy

Goal: make the dynasty feel real.

Required:

- Champion history.
- User season records.
- League standings archive.
- Playoff bracket archive.
- Best players per season later.
- Club honours.
- Manager career record.

Success condition:

- The player can look back at what they built.

## Phase 6: Matchday and Game Moments

Goal: make the game feel less like clicking through screens.

Required:

- Match preview.
- Assistant scouting note.
- Rotation warning.
- Simulating match state.
- Post-match report.
- Inbox consequence.
- Rivalry moments later.
- Board reaction later.

Success condition:

- Each fixture feels like an event, not just a button press.

## Phase 7: Recruitment and Scouting

Goal: make squad building deeper.

Required:

- Scouting reports.
- Player interest.
- Contract demands.
- Negotiation flow.
- Competing clubs later.
- Youth intake later.
- Hidden potential later.

Success condition:

- Recruitment is a decision system, not just a list of players.

## Phase 8: Desktop/Steam Packaging

Goal: package the game for desktop release.

Potential routes:

- Tauri.
- Electron.

Required:

- Desktop window settings.
- Local file-based save storage.
- Offline support.
- App icon.
- Build scripts.
- Version number.
- Steam capsule art.
- Trailer/screenshots.
- Store description.
- Privacy/no online dependency check.

Success condition:

- The game can be launched and played like a desktop app.

## Immediate Next Build Steps

Recommended direct-code order:

1. Finish safe extractions around App.tsx.
2. Switch DashboardView import when safe.
3. Add career phase type.
4. Add season history type.
5. Add offseason placeholder screen.
6. Add champion history tracking.
7. Add next-season generation.
8. Add proper main menu/save slots.

## Current Rule

Until App.tsx is safer, do not add large new features directly inside it.

Small groundwork files are allowed. Big gameplay systems should wait until the app shell is split up.
