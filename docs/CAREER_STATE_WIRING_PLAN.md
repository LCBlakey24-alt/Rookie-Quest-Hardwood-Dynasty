# Career State Wiring Plan

This is the next risky integration area after adding career save fields, career state helpers, and the visible Career Status Panel.

The goal is to safely wire real career state through `App.tsx` without doing a massive app-shell rewrite.

## Current State

Already added:

- `src/types/careerSave.ts`
- `src/game/careerState.ts`
- `src/game/careerRollover.ts`
- `src/components/CareerStatusPanel.tsx`
- `src/styles/career-status-panel.css`
- career fields in `src/game/localSave.ts`

Visible but temporary:

- `CareerStatusPanel` is shown inside Board & Finance.
- It currently uses default Season 1 state because real career state has not been passed from `App.tsx` yet.

## Target State

The app shell should own:

- `careerState.currentSeason`
- `careerState.careerPhase`
- `careerState.careerHistory`

The save system should persist those fields.

The UI should display real career data in:

- Board & Finance / Career Status.
- Main header later.
- Season Summary later.
- Offseason later.

## Safe App.tsx Wiring Steps

### Step 1: Import helpers

Add imports:

```ts
import { DEFAULT_CAREER_STATE, createCareerStateFromSave, toLocalSeasonCareerFields, type CareerState } from './game/careerState';
```

### Step 2: Create initial career state

Near existing initial save setup:

```ts
const initialCareerState = createCareerStateFromSave(initialSave);
```

### Step 3: Add state inside App

Inside `App()`:

```ts
const [careerState, setCareerState] = useState<CareerState>(initialCareerState);
```

### Step 4: Save career fields

Update the existing `saveLocalSeason(...)` call by adding the final optional parameter:

```ts
toLocalSeasonCareerFields(careerState)
```

Also add `careerState` to the save effect dependency list.

### Step 5: Reset career on new franchise/reset

When starting a new franchise or resetting season:

```ts
setCareerState(DEFAULT_CAREER_STATE)
```

### Step 6: Import save should restore career state

Inside `handleImportSave`, after import succeeds:

```ts
setCareerState(createCareerStateFromSave(result));
```

### Step 7: Pass career state to Board & Finance

Update `BoardFinanceScreen` props:

```tsx
careerState={careerState}
```

Update `BoardFinanceScreen` type to accept optional `careerState?: CareerState` and pass it into:

```tsx
<CareerStatusPanel careerState={careerState} />
```

## Vercel Checkpoints

Do not do all steps in one huge commit if avoidable.

Preferred order:

1. Update BoardFinanceScreen to accept optional careerState prop.
2. Check Vercel.
3. Update App.tsx imports/state/save fields.
4. Check Vercel.
5. Update reset/import handlers.
6. Check Vercel.

## Why This Matters

This is the bridge between prototype save state and actual multi-season career mode.

Once this is complete, the game can persist:

- Season number.
- Career phase.
- Manager record.
- Champion history.
- Archived standings/results.

After that, the real `Start Next Season` button becomes much safer to implement.
