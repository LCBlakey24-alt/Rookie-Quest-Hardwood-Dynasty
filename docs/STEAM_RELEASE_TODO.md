# Steam Release Todo Checklist

This is the master checklist for taking Hardwood Dynasty from browser prototype to a Steam-ready basketball management game.

The goal is not simply to upload the current app to Steam. The goal is to release something that feels like a complete management game with a stable career loop, strong presentation, proper save handling, and enough depth to justify a paid Steam launch.

## Release Readiness Verdict

Current status: prototype / early vertical slice.

Steam release status: not ready yet.

Recommended target before Steam:

- Fully playable career loop.
- Desktop build.
- Save slots.
- Main menu.
- Multi-season progression.
- Staff management working.
- Offseason working.
- Matchday flow improved.
- Stable build with repeated testing.
- Steam page assets complete.
- Trailer/screenshots complete.

## 1. Core Game Loop

### Must Have

- [ ] Main Menu.
- [ ] Continue Career.
- [ ] New Franchise.
- [ ] Load Save.
- [ ] Save slots.
- [ ] Delete save.
- [ ] Rename save.
- [ ] Export save.
- [ ] Import save.
- [ ] Settings screen.
- [ ] Credits/about screen.
- [ ] Version/build number visible in-game.
- [ ] First-time onboarding flow.
- [ ] New career setup flow.
- [ ] Select existing club.
- [ ] Create custom club.
- [ ] Choose starting difficulty or club tier.
- [ ] Start regular season.
- [ ] Play/simulate full regular season.
- [ ] Reach playoffs.
- [ ] Simulate playoffs.
- [ ] Crown champion.
- [ ] Show season summary.
- [ ] Enter offseason.
- [ ] Process offseason.
- [ ] Start next season.
- [ ] Continue for multiple seasons.

### Should Have

- [ ] Multiple leagues eventually.
- [ ] Career objectives.
- [ ] Manager reputation.
- [ ] Club reputation changes.
- [ ] Rivalries.
- [ ] Dynamic storylines.
- [ ] More meaningful board pressure.

## 2. Career Save System

### Must Have

- [ ] Move from one-season save to full career save.
- [ ] Save schema versioning.
- [ ] Save migration logic.
- [ ] Current season number.
- [ ] Current career phase.
- [ ] Selected club state.
- [ ] League state.
- [ ] Roster state.
- [ ] Staff state.
- [ ] Finance state.
- [ ] Contracts state.
- [ ] Training state.
- [ ] Tactics state.
- [ ] Rotation state.
- [ ] Regular-season results.
- [ ] Playoff results.
- [ ] Historical champions.
- [ ] Historical league tables.
- [ ] Historical playoff brackets.
- [ ] Manager career record.
- [ ] Autosave.
- [ ] Manual save.
- [ ] Multiple save slots.
- [ ] Save corruption fallback.
- [ ] Backup save recovery.

### Desktop Save Requirements

- [ ] Replace browser-only localStorage dependency for Steam build.
- [ ] Store saves in desktop-safe app data directory.
- [ ] Verify saves persist after closing/reopening the desktop app.
- [ ] Verify saves work offline.
- [ ] Add clear error message if save fails.

## 3. Regular Season Gameplay

### Must Have

- [ ] Fixture schedule.
- [ ] Round-by-round progression.
- [ ] Simulate next fixture.
- [ ] Simulate current round.
- [ ] Simulate to next user game.
- [ ] Simulate to playoffs.
- [ ] Simulate rest of season.
- [ ] League table updates.
- [ ] Team records.
- [ ] Point difference.
- [ ] User team condition changes.
- [ ] User team development changes.
- [ ] Basic AI team simulation.
- [ ] Deterministic RNG for saves.
- [ ] Results archive.

### Should Have

- [ ] Match preview screen.
- [ ] Opponent scouting report.
- [ ] Staff recommendation before match.
- [ ] Matchday event flow.
- [ ] Quarter-by-quarter summary.
- [ ] Post-match report.
- [ ] Top performers.
- [ ] Tactical impact report.
- [ ] Board/inbox reaction.
- [ ] Player morale reaction.

## 4. Match Engine

### Must Have

- [ ] Simulation is balanced across many games.
- [ ] Strong teams win more often but upsets happen.
- [ ] Home advantage is sensible.
- [ ] Tactics affect outcomes.
- [ ] Rotation affects outcomes.
- [ ] Fatigue affects outcomes.
- [ ] Injuries affect outcomes.
- [ ] Training focus affects player state.
- [ ] Box scores generated.
- [ ] Player stats generated.
- [ ] No impossible scorelines.
- [ ] No broken/NaN outputs.

### Should Have

- [ ] Player offense rating affects scoring.
- [ ] Player defence rating affects opponent efficiency.
- [ ] Athleticism affects pace/rebounding/transition.
- [ ] Mentality affects close games.
- [ ] Staff scouting affects preview accuracy.
- [ ] Tactical matchups become more readable.
- [ ] Match engine test harness for 1,000+ games.

## 5. Player System

### Must Have

- [ ] Player name.
- [ ] Age.
- [ ] Position.
- [ ] Role.
- [ ] Archetype.
- [ ] Overall.
- [ ] Potential.
- [ ] Form.
- [ ] Morale.
- [ ] Fatigue.
- [ ] Injury state.
- [ ] Contract.
- [ ] Development progress.
- [ ] Player attribute breakdown visible.
- [ ] Offense rating.
- [ ] Defense rating.
- [ ] Athleticism rating.
- [ ] Mentality rating.
- [ ] Offensive sub-ratings.
- [ ] Defensive sub-ratings.
- [ ] Athletic sub-ratings.
- [ ] Mental sub-ratings.

### Should Have

- [ ] Player profile screen.
- [ ] Player history.
- [ ] Season stats.
- [ ] Career stats.
- [ ] Award history.
- [ ] Morale reasons.
- [ ] Contract demands.
- [ ] Development trait.
- [ ] Injury history.
- [ ] Hidden potential or scouting uncertainty.

## 6. Roster Management

### Must Have

- [ ] Roster table.
- [ ] Sort by role.
- [ ] Sort by overall.
- [ ] Sort by potential.
- [ ] Sort by age.
- [ ] Sort by stats.
- [ ] Filter starters.
- [ ] Filter tired players.
- [ ] Filter injured players.
- [ ] Filter high-upside players.
- [ ] Change player position.
- [ ] Selected player detail panel.
- [ ] Player attribute panel.
- [ ] Squad notes.
- [ ] Attribute leaders.
- [ ] Team identity panel.

### Should Have

- [ ] Drag/drop rotation.
- [ ] Starting five visual board.
- [ ] Bench depth chart.
- [ ] Minutes allocation.
- [ ] Role promises.
- [ ] Morale impact from role.
- [ ] Staff opinion per player.

## 7. Tactics System

### Must Have

- [ ] Pace setting.
- [ ] Offensive focus.
- [ ] Defensive style.
- [ ] Rotation plan.
- [ ] Tactics affect match simulation.
- [ ] Rotation affects player fatigue.
- [ ] Rotation affects match outcome.

### Should Have

- [ ] Basketball court visual layout.
- [ ] Starting five layout.
- [ ] Bench rotation groups.
- [ ] Staff tactical warnings.
- [ ] Opponent-specific tactics.
- [ ] Save tactical presets.
- [ ] Tactical familiarity.
- [ ] Tactical identity label.

## 8. Training and Development

### Must Have

- [ ] Training focus selection.
- [ ] Training affects player development.
- [ ] Training affects fatigue/condition.
- [ ] Development report after games.
- [ ] Near-growth player tracking.

### Should Have

- [ ] Staff-led training plans.
- [ ] Individual player development focus.
- [ ] Youth development pathway.
- [ ] Weekly training reports.
- [ ] Overtraining risk.
- [ ] Injury risk tied to workload.

## 9. Contracts and Free Agents

### Must Have

- [ ] Player contract data.
- [ ] Contract years remaining.
- [ ] Renew contract.
- [ ] Release player.
- [ ] Free agent list.
- [ ] Sign free agent.
- [ ] Signed players join roster.
- [ ] Wage totals shown.
- [ ] Wage budget shown.

### Should Have

- [ ] Negotiation system.
- [ ] Player demands.
- [ ] Contract length choices.
- [ ] Wage demands linked to role/OVR/age.
- [ ] Staff contract recommendations.
- [ ] Rival club interest.
- [ ] Free agent refresh each offseason.
- [ ] Transfer/recruitment deadline later.

## 10. Staff Management

### Must Have

- [ ] Staff roles.
- [ ] Staff salaries.
- [ ] Staff contract years.
- [ ] Staff budget.
- [ ] Staff slot limit.
- [ ] Staff task assignments.
- [ ] Delegated reports.
- [ ] Staff opinion quality.
- [ ] Staff personality bias.
- [ ] Hiring affordability check.
- [ ] Staff visible in-game.

### Should Have

- [ ] Staff screen as own nav item.
- [ ] Hire staff.
- [ ] Fire staff.
- [ ] Renew staff contract.
- [ ] Assign/reassign tasks.
- [ ] Staff affects training.
- [ ] Staff affects scouting.
- [ ] Staff affects injury recovery.
- [ ] Staff affects contract recommendations.
- [ ] Staff affects match previews.
- [ ] Staff wage costs affect finances.

## 11. Board and Finance

### Must Have

- [ ] Board confidence.
- [ ] Board expectations.
- [ ] Club balance estimate.
- [ ] Wage budget.
- [ ] Current wages.
- [ ] Transfer/recruitment budget.
- [ ] Projected revenue.
- [ ] Projected costs.
- [ ] Projected profit/loss.
- [ ] Board notes.
- [ ] Recruitment guidance.

### Should Have

- [ ] Staff wage budget separate from player wage budget.
- [ ] Revenue changes based on standings/playoffs.
- [ ] Prize money.
- [ ] Sponsorship.
- [ ] Attendance.
- [ ] Arena size.
- [ ] Board objectives refresh each season.
- [ ] Board warning events.
- [ ] Possible sacking/contract pressure later.

## 12. Inbox and Game World Reactions

### Must Have

- [ ] Inbox screen.
- [ ] Board notes.
- [ ] Injury messages.
- [ ] Development messages.
- [ ] Match result messages.
- [ ] Next fixture messages.

### Should Have

- [ ] Staff reports appear in inbox.
- [ ] Player concerns.
- [ ] Contract reminders.
- [ ] Offseason reminders.
- [ ] Rivalry news.
- [ ] League headlines.
- [ ] Board warnings.
- [ ] Scouting reports.
- [ ] Message pin/snooze/archive actions.

## 13. Playoffs

### Must Have

- [ ] Regular-season qualification.
- [ ] Quarter finals.
- [ ] Semi finals.
- [ ] Final.
- [ ] Champion detection.
- [ ] Playoff results stored.
- [ ] User team playoff status.

### Should Have

- [ ] Bracket visual polish.
- [ ] Best-of series option later.
- [ ] Playoff MVP.
- [ ] Finals recap.
- [ ] Trophy presentation screen.
- [ ] Champion history archive.

## 14. Offseason

### Must Have

- [ ] Offseason screen visible.
- [ ] Champion spotlight.
- [ ] Season verdict.
- [ ] Contract watch.
- [ ] Development watch.
- [ ] Veteran/regression watch.
- [ ] Retirement watch.
- [ ] Offseason checklist.
- [ ] Progress player age.
- [ ] Progress contract years.
- [ ] Expired contracts handled.
- [ ] Development/regression applied.
- [ ] Free agent refresh.
- [ ] Board objectives refresh.
- [ ] Generate next season.
- [ ] Start next season button.

### Should Have

- [ ] Retirements.
- [ ] Rookie/youth intake.
- [ ] Staff changes.
- [ ] Club reputation changes.
- [ ] League-wide transactions.
- [ ] Season awards archive.
- [ ] Hall of fame / records later.

## 15. Historical Records and Legacy

### Must Have

- [ ] Champion history.
- [ ] User season record history.
- [ ] League table archive.
- [ ] Playoff archive.
- [ ] Manager record.
- [ ] Club titles updated.

### Should Have

- [ ] Player career stats.
- [ ] Award winners by season.
- [ ] Team records.
- [ ] Biggest wins.
- [ ] Best seasons.
- [ ] Hall of fame.
- [ ] Manager milestones.

## 16. UI and Visual Design

### Must Have

- [ ] No glow design rule enforced.
- [ ] Consistent dark broadcast style.
- [ ] Main menu redesign.
- [ ] Dashboard redesign.
- [ ] Roster redesign polish.
- [ ] Staff screen polish.
- [ ] Offseason screen polish.
- [ ] Matchday flow screen.
- [ ] Settings screen.
- [ ] Save/load screen.
- [ ] Tables styled properly.
- [ ] Buttons consistent.
- [ ] Chips/badges consistent.
- [ ] Fonts finalised.
- [ ] Colour palette finalised.
- [ ] Team colours used as accents only.
- [ ] Mobile/tablet responsive layout.
- [ ] Desktop layout polished.

### Should Have

- [ ] Better icons.
- [ ] Better team logo consistency.
- [ ] UI sound effects optional.
- [ ] Subtle non-glow animations.
- [ ] Loading states.
- [ ] Empty states.
- [ ] Error states.
- [ ] Tooltips.
- [ ] Keyboard navigation polish.

## 17. Accessibility

### Must Have

- [ ] Text is readable at desktop resolutions.
- [ ] Text is readable on smaller screens.
- [ ] Sufficient contrast.
- [ ] Reduced motion support.
- [ ] Click targets large enough.
- [ ] Keyboard support for key UI.
- [ ] Form labels.
- [ ] Buttons have clear labels.
- [ ] No information conveyed only by colour.

### Should Have

- [ ] Text scale setting.
- [ ] Colour-blind safe mode.
- [ ] High contrast mode.
- [ ] Screen reader pass.
- [ ] Full keyboard-only pass.

## 18. Performance and Stability

### Must Have

- [ ] No TypeScript errors.
- [ ] No Vercel build failures.
- [ ] No console crash errors in normal play.
- [ ] No mobile freeze on landing/menu.
- [ ] No infinite render loops.
- [ ] No huge unnecessary re-renders.
- [ ] Fast app startup.
- [ ] Save/load does not freeze UI.
- [ ] Simulate rest of season does not freeze badly.
- [ ] App works offline in desktop build.

### Should Have

- [ ] Performance test for 10+ seasons.
- [ ] Performance test for huge history archives.
- [ ] Automated build check.
- [ ] Automated smoke tests.
- [ ] Error boundary.
- [ ] Crash log screen.

## 19. Codebase Architecture

### Must Have

- [ ] Refactor `App.tsx` down.
- [ ] Move DashboardView fully out of App.
- [ ] Move nav config out of App.
- [ ] Move helper functions out of App.
- [ ] Remove temporary global compatibility file.
- [ ] Remove global backup bridge.
- [ ] Use shared app state types.
- [ ] Use shared app config.
- [ ] Use shared app helpers.
- [ ] Create save hooks.
- [ ] Create simulation hooks.
- [ ] Keep feature files modular.

### Should Have

- [ ] Tests around simulation.
- [ ] Tests around offseason rollover.
- [ ] Tests around save migration.
- [ ] Tests around contracts.
- [ ] Tests around staff reports.
- [ ] Storybook/component previews later.

## 20. Desktop Build

### Must Have

- [ ] Choose desktop wrapper: Tauri or Electron.
- [ ] Package React/Vite app into desktop shell.
- [ ] App launches from desktop executable.
- [ ] Windows build works.
- [ ] Linux/Steam Deck build considered.
- [ ] App icon.
- [ ] Window title.
- [ ] Correct default window size.
- [ ] Fullscreen/windowed support.
- [ ] Save files stored outside browser localStorage.
- [ ] Offline play works.
- [ ] Build script documented.
- [ ] Release build reproducible.

### Should Have

- [ ] Auto updater later if outside Steam.
- [ ] Steam Deck control pass.
- [ ] Controller/mouse hybrid support.
- [ ] Cloud save integration later.

## 21. Steamworks Setup

### Must Have

- [ ] Create Steamworks partner account.
- [ ] Complete Steamworks paperwork.
- [ ] Pay Steam Direct app fee.
- [ ] Create app in Steamworks.
- [ ] Configure app name.
- [ ] Configure packages/depots.
- [ ] Upload build through SteamPipe.
- [ ] Configure launch options.
- [ ] Configure supported platforms.
- [ ] Internal test branch.
- [ ] Release branch.
- [ ] Store page draft.
- [ ] Build review submitted.
- [ ] Store page review submitted.
- [ ] Release date configured.
- [ ] Pricing configured.
- [ ] Tags configured.
- [ ] Languages configured.

### Should Have

- [ ] Steam achievements.
- [ ] Steam Cloud saves.
- [ ] Steam rich presence.
- [ ] Steam screenshots integration.
- [ ] Steam Deck verification pass.
- [ ] Steam Playtest before launch.
- [ ] Demo for Steam Next Fest.

## 22. Steam Store Page Assets

### Must Have

- [ ] Capsule art.
- [ ] Header capsule.
- [ ] Small capsule.
- [ ] Main capsule.
- [ ] Vertical capsule if needed.
- [ ] Library capsule.
- [ ] Library hero.
- [ ] Library logo.
- [ ] Client icon.
- [ ] Community icon.
- [ ] Screenshots.
- [ ] Trailer.
- [ ] Short description.
- [ ] Long description.
- [ ] Feature bullet list.
- [ ] System requirements.
- [ ] About this game section.
- [ ] Content descriptors if needed.

### Should Have

- [ ] Animated GIF snippets for store copy.
- [ ] Press kit images.
- [ ] Logo pack.
- [ ] Social media templates.
- [ ] Steam announcement images.

## 23. Trailer and Screenshots

### Must Have

- [ ] 30-60 second launch trailer.
- [ ] Main menu shot.
- [ ] Dashboard shot.
- [ ] Roster/player attributes shot.
- [ ] Tactics shot.
- [ ] Matchday shot.
- [ ] Staff screen shot.
- [ ] Offseason shot.
- [ ] Season summary shot.
- [ ] Store screenshots at correct quality.

### Should Have

- [ ] Trailer script.
- [ ] Trailer music.
- [ ] Trailer captions.
- [ ] Steam capsule screenshot layout plan.
- [ ] Short TikTok/Reels cuts.

## 24. Marketing and Community

### Must Have

- [ ] Final game name confirmed.
- [ ] Final logo confirmed.
- [ ] Short pitch.
- [ ] One-sentence hook.
- [ ] Steam page copy.
- [ ] Discord or community channel decision.
- [ ] Social media launch plan.
- [ ] Press contact email.
- [ ] Basic website/landing page.
- [ ] Mailing list or wishlist call-to-action.

### Should Have

- [ ] Devlog posts.
- [ ] Roadmap graphic.
- [ ] Steam announcement posts.
- [ ] Demo announcement.
- [ ] Playtest signup form.
- [ ] Influencer/creator outreach list.

## 25. Legal and Content Safety

### Must Have

- [ ] No NBA/WNBA/real league trademarks.
- [ ] No real team names/logos.
- [ ] No copyrighted player names.
- [ ] No unlicensed music.
- [ ] No unlicensed fonts.
- [ ] No unlicensed images.
- [ ] Terms/privacy if collecting data.
- [ ] Clear fictional league disclaimer.
- [ ] Check third-party package licences.
- [ ] Check asset licences.

### Should Have

- [ ] Trademark search for final game name.
- [ ] Company/publisher name decision.
- [ ] Simple EULA review.
- [ ] Privacy policy if analytics/cloud features are added.

## 26. Testing Plan

### Must Have

- [ ] New career test.
- [ ] Team select test.
- [ ] Custom team test.
- [ ] Save/load test.
- [ ] Export/import test.
- [ ] Full regular season test.
- [ ] Full playoffs test.
- [ ] Full offseason test.
- [ ] Next season test.
- [ ] 5-season sim test.
- [ ] Roster management test.
- [ ] Staff screen test.
- [ ] Contract/free agent test.
- [ ] Training test.
- [ ] Tactics test.
- [ ] Board/finance test.
- [ ] No crash on reset.
- [ ] No crash on bad import.
- [ ] No crash with no save.
- [ ] No crash after desktop restart.

### Should Have

- [ ] External playtest.
- [ ] Steam Playtest.
- [ ] Bug report form.
- [ ] Known issues list.
- [ ] Balance feedback form.

## 27. Release Candidate Gates

The game is not ready for Steam until all of these are true:

- [ ] Build is green for at least 10 consecutive commits.
- [ ] Desktop build launches reliably.
- [ ] Save/load works in desktop build.
- [ ] Full season can be completed.
- [ ] Playoffs can be completed.
- [ ] Offseason can be completed.
- [ ] Next season can start.
- [ ] No blocker bugs remain.
- [ ] Main menu is polished.
- [ ] Screenshots look store-ready.
- [ ] Trailer is finished.
- [ ] Store page is complete.
- [ ] Build submitted to Steam review.
- [ ] Store page submitted to Steam review.
- [ ] Price and release date are set.

## 28. Recommended Build Order From Here

1. Keep Vercel green.
2. Finish refactoring App.tsx.
3. Add proper Staff nav item.
4. Add Offseason preview to Season Summary.
5. Make Offseason actually progress the save.
6. Build career save model into real gameplay.
7. Add main menu/save slots.
8. Add desktop wrapper.
9. Move saves out of localStorage for desktop.
10. Build matchday flow.
11. Polish core screens.
12. Add testing and bug tracking.
13. Create Steam page assets.
14. Package and upload a Steam test build.
15. Run playtest.
16. Fix issues.
17. Submit for Steam review.

## Hard Truth

Steam should not be the next milestone.

The next milestone should be a stable vertical slice:

New Career -> Regular Season -> Playoffs -> Season Summary -> Offseason -> Next Season.

Once that loop feels good, Steam becomes realistic.
