# Hardwood Dynasty Visual Design System

This document defines the target visual direction for Hardwood Dynasty.

It is based on the approved design-board direction: a premium dark basketball management interface with broadcast graphics, court-orange action styling, blue analytics, gold legacy moments, and strong club identity.

## Design Name

Midnight Broadcast.

## Design Goal

Hardwood Dynasty should feel like a Steam-quality basketball management game, not a generic website dashboard.

The target feeling is:

- Premium sports broadcast package.
- Basketball operations room.
- Club command centre.
- Data-rich management sim.
- Dark arena atmosphere.

Every screen should feel like the player is making club decisions inside a living basketball world.

## Core Visual Pillars

### 1. Dark Arena Foundation

Use deep navy, near-black, and subtle arena lighting as the base.

The app should feel like the lights are low, the court is glowing, and the manager is working inside a professional sports environment.

### 2. Court Orange Action

Orange is the main interaction colour.

Use it for:

- Continue career.
- Simulate fixture.
- Start next season.
- Active navigation.
- Primary screen actions.
- Important call-to-action buttons.

### 3. Broadcast Blue Data

Blue is the analysis/scouting/data colour.

Use it for:

- Win probability.
- Matchup labels.
- Scouting reports.
- Analytics.
- Data visualisations.
- Secondary highlights.

### 4. Championship Gold Legacy

Gold is the prestige colour.

Use it for:

- Playoffs.
- Champions.
- Trophy cards.
- Offseason completion.
- Board prestige.
- Club history.
- Legacy screens.

### 5. Team Colours as Local Accents

Team colours should support the global theme, not replace it.

Use team colours for:

- Crest frames.
- Match cards.
- Scoreboard strips.
- Small glows.
- Team header edges.
- Selected club identity panels.

Avoid full-screen team-colour backgrounds.

## Colour Tokens

```css
:root {
  --hd-bg-main: #050A12;
  --hd-bg-panel: #0B1220;
  --hd-bg-raised: #111827;
  --hd-bg-soft: rgba(15, 23, 42, 0.84);

  --hd-primary: #F97316;
  --hd-primary-dark: #C2410C;
  --hd-primary-soft: rgba(249, 115, 22, 0.16);

  --hd-secondary: #38BDF8;
  --hd-secondary-dark: #0369A1;
  --hd-secondary-soft: rgba(56, 189, 248, 0.14);

  --hd-tertiary: #D4AF37;
  --hd-tertiary-muted: #A8872D;
  --hd-tertiary-soft: rgba(212, 175, 55, 0.16);

  --hd-text-main: #F8FAFC;
  --hd-text-muted: #94A3B8;
  --hd-text-faint: #64748B;

  --hd-border-soft: rgba(255, 255, 255, 0.08);
  --hd-border-strong: rgba(255, 255, 255, 0.16);

  --hd-success: #22C55E;
  --hd-warning: #F59E0B;
  --hd-danger: #EF4444;
}
```

## Typography

Recommended font stack:

### Headings

Rajdhani or Bebas Neue.

Use for:

- Main menu title.
- Screen titles.
- Big stat numbers.
- Scoreboards.
- Team names.

Suggested:

```css
--hd-font-heading: 'Rajdhani', 'Arial Narrow', sans-serif;
```

### Body

Inter.

Use for:

- Screen text.
- Tables.
- Buttons.
- Inbox notes.
- Player reports.

Suggested:

```css
--hd-font-body: 'Inter', system-ui, sans-serif;
```

### Data / Numbers

JetBrains Mono or DIN-style condensed font.

Use for:

- Scores.
- Records.
- Ratings.
- Wages.
- Table data.

Suggested:

```css
--hd-font-data: 'JetBrains Mono', monospace;
```

## Layout Principles

Every screen should follow this basic hierarchy:

1. Screen header.
2. Primary command panel.
3. Summary strip.
4. Main content grid.
5. Detailed table/list.
6. Assistant notes or contextual decisions.

The user should always know:

- What is happening?
- What matters most?
- What should I do next?

## Main Menu Target

The Main Menu should feel like a game launch screen.

Required layout:

- Large Hardwood Dynasty logo/title.
- Dark court/arena background.
- Left-side vertical menu.
- Continue Career.
- New Franchise.
- Load Save.
- Settings.
- Credits.
- Current save card.
- Version label.

Target vibe:

A coach standing courtside before a season starts.

## Dashboard Target

The Dashboard is the manager hub.

Required layout:

- Club header.
- Current season/phase/round.
- Next fixture command card.
- Staff recommendation card.
- Board confidence.
- Record.
- League position.
- Recent result.
- Inbox snapshot.
- Team leaders or squad risk.

The main action should usually be one of:

- Review Rotation.
- Adjust Tactics.
- Simulate Fixture.

## Roster Target

Roster should feel like squad management, not just a list.

Required layout:

- Squad summary strip.
- Player table.
- Filter tabs.
- Selected player panel.
- Attribute/status indicators.
- Contract/development/fatigue badges.

Future target:

Clicking a player row should show a player detail panel on the right.

## Tactics Target

Tactics should feel like a basketball coaching board.

Required layout:

- Court-style starting five layout.
- Rotation list.
- Tactical identity panel.
- Sliders/options for pace, spacing, defence, rebounding, press intensity.
- Assistant warnings.

This screen should be one of the most visually basketball-specific screens in the game.

## Matchday Target

Matchday should become a three-step flow.

### Step 1: Preview

Show:

- Opponent.
- Venue.
- Form.
- Win probability.
- Key matchup.
- Staff recommendation.

### Step 2: Simulation

Show:

- Quarter progress.
- Scoreline.
- Momentum/flow.
- Optional speed controls.

### Step 3: Post-Match Report

Show:

- Final score.
- Top performers.
- Team stats.
- Condition report.
- Development report.
- Inbox reactions.

## Offseason Target

Offseason should feel like a major game phase.

Required layout:

- Season complete title.
- Champion spotlight.
- User season verdict.
- Offseason checklist.
- Player ageing report.
- Contract expiry report.
- Development/regression report.
- Start next season button.
- Dynasty history panel.

## Component System

### Panels

Use deep panel backgrounds with subtle borders and glow.

Target style:

- Dark gradient.
- Soft border.
- Rounded corners.
- Slight elevation.
- Optional team-colour edge glow.

### Buttons

Primary button:

- Orange fill.
- Strong contrast.
- Used for main game actions.

Secondary button:

- Dark background.
- Blue or soft border.
- Used for review/adjust actions.

Danger button:

- Red border/fill.
- Used for reset/delete/release.

### Chips / Badges

Use chips for status clarity.

Examples:

- Healthy.
- Tired.
- Injured.
- Playoff Zone.
- Board Concern.
- Win Now.
- Expiring.
- Development Priority.

### Tables

Tables should look designed.

Required:

- Styled rows.
- Clear headers.
- Hover state.
- Compact stat columns.
- Badges/status markers.
- Better spacing.
- No raw HTML-table feel.

## Motion

Motion should be subtle.

Use:

- Light screen entry.
- Button press feedback.
- Hover states on desktop.
- Reduced motion support.

Avoid:

- Constant looping effects.
- Heavy blur everywhere.
- Large animations on mobile.

## Implementation Order

Visual implementation should happen in this order:

1. Add design tokens CSS.
2. Redesign Main Menu / Landing.
3. Redesign Dashboard.
4. Redesign Roster table/player panel.
5. Redesign Tactics with court layout.
6. Add Matchday flow.
7. Add Offseason visual phase.

## Rule for Future UI Changes

Do not make random isolated visual tweaks.

Every UI change should support one of these goals:

- clearer decision-making
- stronger basketball identity
- better Steam-game feel
- better readability
- better club identity
- better matchday/offseason presentation

## Final Target

Hardwood Dynasty should look like a premium basketball management game: dark, sharp, readable, cinematic, data-rich, and clearly built around club decisions.
