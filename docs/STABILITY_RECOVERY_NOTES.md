# Stability Recovery Notes

This document records the recovery work completed after the large Codex merge that temporarily broke the Vercel build.

The goal is to stop future AI builders from repeating the same mistake.

## Current Status

As of the latest successful deployment, `main` is building again on Vercel.

There are no open pull requests.

## What Broke

A large merge introduced several half-wired changes across the app. The main build failures came from TypeScript errors rather than runtime bugs.

Known issues that were fixed:

1. `TeamSelectScreen.tsx`
   - Missing state for expansion league filtering.
   - Missing state for selected league preview.
   - Missing upload error state.
   - Missing `MAX_LOGO_UPLOAD_BYTES` constant.
   - Missing `LeagueExpansionProfile` type import.
   - Duplicate `handleUpload` function.
   - Duplicate setup `useEffect`.

2. `localSave.ts`
   - Duplicate exported functions:
     - `exportLocalSeasonSave`
     - `importLocalSeasonSave`
   - Added backup-save helper support.

3. `LandingScreen.tsx`
   - `reducedMotion` was required in props but not passed by `App.tsx`.
   - The prop was made optional because the component does not currently use it.

4. Temporary global compatibility
   - `App.tsx` currently references `MotionMode` and `getBackupLocalSeasonSaveMeta` without local import/type definitions.
   - A temporary declaration file was added at `src/types/app-globals.d.ts`.
   - `localSave.ts` currently assigns `getBackupLocalSeasonSaveMeta` to `globalThis` as a compatibility bridge.

## Important Warning

Do not delete `src/types/app-globals.d.ts` yet.

Do not remove the `globalThis.getBackupLocalSeasonSaveMeta` bridge in `localSave.ts` yet.

These are temporary stabilisers until `App.tsx` is safely refactored.

## Why App.tsx Is Risky

`App.tsx` is currently too large and controls too many systems:

- navigation
- local save
- backup metadata
- import/export
- selected team state
- custom team creation
- rotation
- tactics
- training
- simulation controls
- deterministic RNG
- playoff simulation
- dashboard rendering
- density/focus/motion settings

Future AI edits to `App.tsx` should be avoided unless absolutely necessary.

## Safe Next Refactor Plan

Refactor in small steps only:

1. Extract `DashboardView` into `src/components/DashboardView.tsx`.
2. Extract dashboard prop types into the same component file.
3. Extract save/import/export handlers into a hook after DashboardView is stable.
4. Import `getBackupLocalSeasonSaveMeta` directly into `App.tsx`.
5. Define `MotionMode` directly in `App.tsx` or move display settings into a hook.
6. Remove `src/types/app-globals.d.ts`.
7. Remove the `globalThis.getBackupLocalSeasonSaveMeta` bridge from `localSave.ts`.

## Direct Edit Rules Until Refactor

- Keep direct edits tiny.
- Do not make broad multi-file feature changes.
- Do not combine visual changes with state changes.
- Do not add new app-level state to `App.tsx` unless there is no alternative.
- After every direct edit, check Vercel status.

## Recommended Next Gameplay Work After Stabilisation

Once the app shell is safer:

1. Add offseason phase.
2. Add multi-season history.
3. Progress contract years at season end.
4. Generate next season fixtures.
5. Add player ageing and regression.
6. Add youth/free-agent refresh.

## Summary

The project is now back to a green build, but it is still architecturally fragile.

The next major goal is not adding more screens. The next major goal is reducing `App.tsx` risk so future gameplay systems can be added safely.
