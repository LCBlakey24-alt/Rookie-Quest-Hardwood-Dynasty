# Screen Integration Plan

This plan explains how to safely make the new standalone screens visible in the app without repeating the earlier large-merge build problems.

The main risk is `src/App.tsx`, which still controls navigation, view rendering and app-level state. Screen integration should therefore happen one screen at a time with a Vercel check after each commit.

## Current Standalone Screens Ready For Integration

- `src/components/StaffScreen.tsx`
- `src/components/OffseasonScreen.tsx`
- `src/components/DashboardView.tsx` exists but is not yet wired in.

## Integration Rule

Only wire one screen at a time.

Do not combine:

- new nav item
- new screen render
- new app state
- save migrations
- design changes

in the same commit unless strictly necessary.

## Phase 1: Staff Screen

Staff is the safest first integration because it does not require season phase logic.

Required App changes:

1. Import `StaffScreen` from `./components/StaffScreen`.
2. Add `Staff` to the `ActiveView` type if that type is still local to `App.tsx`.
3. Add a Staff nav item using a suitable icon.
4. Add a render branch:
   - `activeView === 'Staff' && <StaffScreen team={selectedTeam} />`
5. Check Vercel.

Expected result:

The player can open a Staff screen and view:

- staff budget
- current staff
- delegation board
- staff opinions
- hiring affordability preview

No save changes are required yet.

## Phase 2: Offseason Screen

Offseason is slightly riskier because it eventually needs to connect to season completion.

Initial safe integration should be temporary and visible from nav.

Required App changes:

1. Import `OffseasonScreen` from `./components/OffseasonScreen`.
2. Add `Offseason` to `ActiveView`.
3. Add an Offseason nav item.
4. Render:
   - `activeView === 'Offseason' && <OffseasonScreen teams={managedTeams} selectedTeamId={selectedTeam.id} playoffResults={playoffResults} />`
5. Check Vercel.

Expected result:

The player can preview offseason systems before they are fully connected to the end-of-season flow.

Later, Offseason should only unlock after playoffs/summary completion.

## Phase 3: DashboardView Switch

This is more delicate.

`DashboardView.tsx` already exists but App still owns a local DashboardView implementation.

Safe approach:

1. Compare props between local App DashboardView and extracted DashboardView.
2. Import extracted DashboardView under an alias if needed.
3. Switch render usage.
4. Keep old local helper functions temporarily if `noUnusedLocals` remains off.
5. Check Vercel.
6. Remove old local DashboardView only after imported version is verified.

## Phase 4: Temporary Globals Cleanup

Only after App is safer:

1. Import `getBackupLocalSeasonSaveMeta` directly into `App.tsx`.
2. Replace global usage.
3. Move `MotionMode` to imported `src/types/appState.ts`.
4. Remove `src/types/app-globals.d.ts`.
5. Remove the `globalThis.getBackupLocalSeasonSaveMeta` bridge from `localSave.ts`.
6. Check Vercel after each small step.

## Phase 5: Real Game Flow

Once Staff and Offseason are visible:

1. Staff should become save-backed.
2. Staff salaries should affect finance.
3. Delegated staff reports should feed inbox/dashboard advice.
4. Offseason should appear automatically after playoffs end.
5. Offseason should archive history and generate the next season.

## Current Recommendation

Next code change should be:

Wire Staff screen into navigation first.

Do not wire Offseason until Staff is green.
