import { seasonFixtures } from '../data/fixtures';
import { teams } from '../data/teams';
import { calculateStandings } from '../game/calculateStandings';
import { calculateSimulationDiagnostics } from '../game/simulationDiagnostics';
import type { SimulatedGameResult } from '../game/simulateGame';
import type { TacticalSettings } from '../game/tactics';
import type { Fixture, Team } from '../types/basketball';

type SimKeyEvent = 'Next My Game' | 'Playoffs Start' | 'Season End';

const totalRounds = Math.max(...seasonFixtures.map((fixture) => fixture.round));

const SIM_KEY_EVENT_HINTS: Record<SimKeyEvent, string> = {
  'Next My Game': 'Advance until your club appears again on the schedule.',
  'Playoffs Start': 'Fast-forward through the remaining regular-season fixtures.',
  'Season End': 'Sim every remaining regular-season and playoff game.',
};

export type DashboardViewProps = {
  boardConfidence: number;
  currentRound: number;
  developmentReady: number;
  diagnostics: ReturnType<typeof calculateSimulationDiagnostics>;
  handleResetSeason: () => void;
  handleExportSave: () => void;
  handleOpenImportSave: () => void;
  handleSimulateCurrentRound: () => void;
  handleSimulateNextFixture: () => void;
  handleSimulateRestOfSeason: () => void;
  handleSimulateToKeyEvent: () => void;
  handleSimulateToNextMyGame: () => void;
  isSimulating: boolean;
  latestResult: SimulatedGameResult | null;
  nextAwayTeam: Team | null;
  nextFixture: Fixture | undefined;
  nextHomeTeam: Team | null;
  nextMatchupLabel: string | null;
  results: SimulatedGameResult[];
  savedAt: string | null;
  backupMeta: { savedAt: string; teamId: string } | null;
  selectedTeam: Team;
  tiredCount: number;
  injuredCount: number;
  standings: ReturnType<typeof calculateStandings>;
  tactics: TacticalSettings;
  topPlayers: Team['roster'];
  managerTasks: string[];
  seasonObjective: { title: string; targetRank: number; summary: string };
  objectiveProgress: number;
  userGameResult: SimulatedGameResult | null;
  simKeyEvent: SimKeyEvent;
  simNotice: string | null;
  setSimKeyEvent: (event: SimKeyEvent) => void;
  userStanding: ReturnType<typeof calculateStandings>[number] | undefined;
  userWonLatestGame: boolean;
};

export function DashboardView({
  boardConfidence,
  currentRound,
  developmentReady,
  diagnostics,
  handleResetSeason,
  handleExportSave,
  handleOpenImportSave,
  handleSimulateCurrentRound,
  handleSimulateNextFixture,
  handleSimulateRestOfSeason,
  handleSimulateToKeyEvent,
  handleSimulateToNextMyGame,
  isSimulating,
  latestResult,
  nextAwayTeam,
  nextFixture,
  nextHomeTeam,
  nextMatchupLabel,
  results,
  savedAt,
  backupMeta,
  selectedTeam,
  tiredCount,
  injuredCount,
  standings,
  tactics,
  topPlayers,
  managerTasks,
  seasonObjective,
  objectiveProgress,
  userGameResult,
  simKeyEvent,
  simNotice,
  setSimKeyEvent,
  userStanding,
  userWonLatestGame,
}: DashboardViewProps) {
  const backupTeam = backupMeta ? teams.find((team) => team.id === backupMeta.teamId) : null;
  const backupAgeHours = backupMeta ? Math.max(0, Math.round((Date.now() - new Date(backupMeta.savedAt).getTime()) / (1000 * 60 * 60))) : null;
  const backupFreshness = backupAgeHours === null
    ? null
    : backupAgeHours <= 2
      ? 'Fresh'
      : backupAgeHours <= 24
        ? 'Recent'
        : 'Stale';

  return (
    <section className="dashboard-grid">
      <article className="panel next-game-panel">
        <p className="eyebrow">Next Fixture</p>
        {simNotice && <span className="chip">{simNotice}</span>}
        {nextFixture && nextHomeTeam && nextAwayTeam ? (
          <>
            <div className="matchup-row">
              <TeamMini name={nextHomeTeam.shortName} colour={nextHomeTeam.primaryColor} />
              <span className="versus">VS</span>
              <TeamMini name={nextAwayTeam.shortName} colour={nextAwayTeam.primaryColor} />
            </div>
            <h3>{nextHomeTeam.name} vs {nextAwayTeam.name}</h3>
            <p className="muted">Round {nextFixture.round} of {totalRounds} · BSBL Regular Season</p>
            <div className="tactics-summary-row">
              <span>{nextMatchupLabel ?? 'Hidden matchup'}</span>
              <span>{tactics.pace}</span>
              <span>{tactics.offensiveFocus}</span>
              <span>{tactics.defensiveStyle}</span>
            </div>
            <button className="primary-action" disabled={isSimulating} onClick={handleSimulateNextFixture}>{isSimulating ? 'Simulating...' : 'Simulate Next Fixture'}</button>
            <button className="secondary-action" disabled={isSimulating} onClick={handleSimulateCurrentRound}>Simulate Round {currentRound}</button>
            <button className="secondary-action" disabled={isSimulating} onClick={handleSimulateToNextMyGame}>Simulate To Next My Game</button>
            <div className="option-row">
              <select
                aria-label="Select simulation target"
                value={simKeyEvent}
                onChange={(event) => setSimKeyEvent(event.target.value as SimKeyEvent)}
              >
                {(['Next My Game', 'Playoffs Start', 'Season End'] as const).map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <button className="secondary-action" disabled={isSimulating} onClick={handleSimulateToKeyEvent}>Simulate To Key Event</button>
            </div>
            <p className="muted">{SIM_KEY_EVENT_HINTS[simKeyEvent]}</p>
            <button className="secondary-action" disabled={isSimulating} onClick={handleSimulateRestOfSeason}>Simulate Rest of Season</button>
          </>
        ) : (
          <>
            <h3>Regular season complete</h3>
            <p className="muted">All {seasonFixtures.length} BSBL regular season games have been simulated.</p>
          </>
        )}
      </article>

      <article className="panel stat-panel">
        <p className="eyebrow">Current Record</p>
        <strong>{userStanding?.wins ?? 0}-{userStanding?.losses ?? 0}</strong>
        <span className="muted">{userStanding?.played ? `After ${userStanding.played} game${userStanding.played === 1 ? '' : 's'}` : 'Season has not started'}</span>
      </article>

      <article className="panel stat-panel">
        <p className="eyebrow">League Position</p>
        <strong>{getOrdinalPosition(standings.findIndex((standing) => standing.teamId === selectedTeam.id) + 1)}</strong>
        <span className="muted">{results.length ? 'Live standings' : 'Awaiting first game'}</span>
      </article>

      <article className="panel stat-panel">
        <p className="eyebrow">Board Confidence</p>
        <strong>{boardConfidence}%</strong>
        <span className={userGameResult && !userWonLatestGame ? 'warning' : 'positive'}>
          {userGameResult ? (userWonLatestGame ? 'Rising' : 'Watching closely') : 'Stable'}
        </span>
      </article>

      <article className="panel stat-panel">
        <p className="eyebrow">Sim Health</p>
        <strong>{diagnostics.games ? Math.round(diagnostics.averageCombinedScore) : '—'}</strong>
        <span className="muted">
          {diagnostics.games
            ? `Home W ${Math.round(diagnostics.homeWinRate * 100)}% · Upsets ${Math.round(diagnostics.upsetRate * 100)}% · Blowouts ${Math.round(diagnostics.blowoutRate * 100)}%`
            : 'No games simulated yet'}
        </span>
      </article>

      <article className="panel stat-panel">
        <p className="eyebrow">Team Snapshot</p>
        <strong>{injuredCount + tiredCount}</strong>
        <span className="muted">{injuredCount} injured · {tiredCount} tired · {developmentReady} near growth</span>
      </article>

      <article className="panel wide-panel save-panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Local Save</p>
            <h3>Browser season save</h3>
          </div>
          <span className="chip">Auto-save</span>
        </div>
        <p className="muted">
          {savedAt ? `Last saved ${new Date(savedAt).toLocaleString()}` : 'No saved season yet.'}
        </p>
        <div className="option-row" style={{ marginBottom: '0.75rem' }}>
          <button className="option-button" onClick={handleExportSave}>Export Save</button>
          <button className="option-button" onClick={handleOpenImportSave}>Import Save</button>
        </div>
        {backupMeta && (
          <p className="muted">
            Backup: {backupTeam?.name ?? backupMeta.teamId} · {backupFreshness} · {backupAgeHours}h old
          </p>
        )}
        <button className="secondary-action danger-action" onClick={handleResetSeason}>Reset Local Season</button>
      </article>

      <article className="panel wide-panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Manager Tasks</p>
            <h3>Recommended next moves</h3>
          </div>
          <span className="chip">{managerTasks.length || 1} item{managerTasks.length === 1 ? '' : 's'}</span>
        </div>
        <div className="assistant-notes">
          {(managerTasks.length ? managerTasks : ['No urgent tasks — keep momentum and monitor fatigue']).map((task) => (
            <div className="assistant-note" key={task}>
              <strong>Action</strong>
              <span>{task}</span>
            </div>
          ))}
        </div>
      </article>

      <article className="panel wide-panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Season Objective</p>
            <h3>{seasonObjective.title}</h3>
          </div>
          <span className="chip">{Math.round(objectiveProgress)}%</span>
        </div>
        <p className="muted">{seasonObjective.summary}</p>
        <div className="meter-cell" aria-label={`Objective progress ${Math.round(objectiveProgress)} percent`}>
          <div className="meter-track">
            <div className="meter-fill" style={{ width: `${Math.max(0, Math.min(100, objectiveProgress))}%` }} />
          </div>
        </div>
      </article>

      {latestResult && (
        <article className="panel wide-panel result-panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Latest Result</p>
              <h3>{getTeam(latestResult.winnerTeamId).name} win</h3>
            </div>
            <span className="chip">{latestResult.matchupLabel}</span>
          </div>
          <div className="scoreboard-row">
            <ScoreBlock team={getTeam(latestResult.homeTeamId).shortName} score={latestResult.homeScore} colour={getTeam(latestResult.homeTeamId).primaryColor} />
            <span className="versus">—</span>
            <ScoreBlock team={getTeam(latestResult.awayTeamId).shortName} score={latestResult.awayScore} colour={getTeam(latestResult.awayTeamId).primaryColor} />
          </div>
          <p className="muted">{latestResult.summary}</p>
        </article>
      )}

      <h2>League Standings</h2>
      <table border={1}>
        <thead><tr><th>Rank</th><th>Team</th><th>W</th><th>L</th><th>PCT</th></tr></thead>
        <tbody>
          {standings.map((team, index) => <tr key={team.teamId}><td>{index + 1}</td><td>{team.teamName}</td><td>{team.wins}</td><td>{team.losses}</td><td>{team.winPercentage.toFixed(3)}</td></tr>)}
        </tbody>
      </table>

      <p>Total Games Simulated: {results.length}</p>
    </section>
  );
}

function TeamMini({ name, colour }: { name: string; colour: string }) {
  return (
    <div className="team-mini" style={{ borderColor: colour }}>
      <span>{name}</span>
    </div>
  );
}

function ScoreBlock({ team, score, colour }: { team: string; score: number; colour: string }) {
  return (
    <div className="score-block" style={{ borderColor: colour }}>
      <span>{team}</span>
      <strong>{score}</strong>
    </div>
  );
}

function getTeam(teamId: string, teamList: Team[] = teams): Team {
  const team = teamList.find((candidate) => candidate.id === teamId);

  if (!team) {
    throw new Error(`Team not found: ${teamId}`);
  }

  return team;
}

function getOrdinalPosition(position: number) {
  if (position <= 0) return '—';

  const suffix = position % 10 === 1 && position !== 11
    ? 'st'
    : position % 10 === 2 && position !== 12
      ? 'nd'
      : position % 10 === 3 && position !== 13
        ? 'rd'
        : 'th';

  return `${position}${suffix}`;
}
