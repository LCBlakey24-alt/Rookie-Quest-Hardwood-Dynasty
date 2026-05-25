# Career Status Panel Integration Note

The reusable `CareerStatusPanel` component is available and is currently surfaced inside the Board & Finance / club office area.

Current behaviour:

- Displays default Season 1 career state until real career state is wired through App.
- Shows current season.
- Shows career phase.
- Shows completed seasons.
- Shows manager win rate.
- Shows manager championships.
- Shows best regular-season finish.
- Shows last archived champion when career history is available.

Reason for temporary placement:

`App.tsx` is still oversized and risky to edit directly. Board & Finance is a safer visible integration point while the app shell is gradually refactored.

Future work:

- Pass real career state into `CareerStatusPanel` from the app shell.
- Show current season in the main header.
- Persist current season and history through the upgraded local save fields.
- Update career state when the next-season rollover action is wired.
