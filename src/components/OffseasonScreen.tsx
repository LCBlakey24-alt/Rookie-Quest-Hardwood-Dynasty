import { createEmptyCareerHistory, type CareerHistory } from '../types/careerSave';
import { createOffseasonPreview, offseasonSteps, progressRosterForOffseason } from '../game/offseason';
import type { SimulatedGameResult } from '../game/simulateGame';
import type { Team } from '../types/basketball';

type OffseasonScreenProps = {
  completedSeason?: number;
  teams: Team[];
  selectedTeamId: string;
  playoffResults: SimulatedGameResult[];
  history?: CareerHistory;
};

export function OffseasonScreen({
  completedSeason = 1,
  teams,
  selectedTeamId,
  playoffResults,
  history = createEmptyCareerHistory(),
}: OffseasonScreenProps) {
  const selectedTeam = teams.find((team) => team.id === selectedTeamId) ?? teams[0];
  const preview = createOffseasonPreview({
    completedSeason,
    teams,
    selectedTeamId: selectedTeam?.id ?? selectedTeamId,
    playoffResults,
    history,
  });
  const progressedTeam = selectedTeam ? progressRosterForOffseason(selectedTeam) : null;
  const expiringAfterRollover = progressedTeam?.roster.filter((player) => (player.contract?.yearsRemaining ?? 1) <= 0) ?? [];
  const veteranWatch = selectedTeam?.roster.filter((player) => player.age >= 32).sort((a, b) => b.age - a.age).slice(0, 5) ?? [];
  const developmentWatch = preview.developmentCandidates.slice(0, 5);

  return (
    <section className="offseason-screen">
      <div className="screen-heading">
        <div>
          <p className="eyebrow">Offseason Control</p>
          <h3>Season {preview.completedSeason} rollover</h3>
          <p className="muted">Process ageing, contracts, development, board expectations and the next campaign setup.</p>
        </div>
        <span className="chip">Season {preview.nextSeason} loading</span>
      </div>

      <section className="roster-summary-grid">
        <SummaryCard label="Next Season" value={preview.nextSeason.toString()} helper="Career year after rollover" />
        <SummaryCard label="Expiring Deals" value={preview.expiringPlayers.length.toString()} helper={`${expiringAfterRollover.length} may hit free agency`} />
        <SummaryCard label="Development Watch" value={preview.developmentCandidates.length.toString()} helper="Young players with upside" />
        <SummaryCard label="Veteran Watch" value={preview.regressionCandidates.length.toString()} helper="Possible regression risk" />
      </section>

      <section className="result-grid">
        <article className="panel offseason-panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Champion Spotlight</p>
              <h3>{preview.champion?.championTeamName ?? 'Champion not archived yet'}</h3>
            </div>
            <span className="chip">Legacy record</span>
          </div>
          <p className="muted">
            {preview.champion
              ? `${preview.champion.championTeamName} enter the history book as Season ${preview.champion.seasonNumber} champions.`
              : 'Once playoffs are complete, the champion record will be archived here before the next season begins.'}
          </p>
        </article>

        <article className="panel offseason-panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Manager Briefing</p>
              <h3>{selectedTeam?.name ?? 'Selected club'} offseason priorities</h3>
            </div>
            <span className="chip">Staff note</span>
          </div>
          <div className="assistant-notes">
            <div className="assistant-note">
              <strong>Contracts</strong>
              <span>{preview.expiringPlayers.length} player{preview.expiringPlayers.length === 1 ? '' : 's'} should be reviewed before next season starts.</span>
            </div>
            <div className="assistant-note">
              <strong>Development</strong>
              <span>{developmentWatch[0]?.name ?? 'No obvious prospect'} leads the current development watch list.</span>
            </div>
            <div className="assistant-note">
              <strong>Age curve</strong>
              <span>{veteranWatch[0]?.name ?? 'No major veteran risk'} is the oldest current roster watch item.</span>
            </div>
          </div>
        </article>
      </section>

      <article className="panel offseason-panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Rollover Checklist</p>
            <h3>Steps before next season</h3>
          </div>
          <span className="chip">{offseasonSteps.length} steps</span>
        </div>
        <div className="offseason-step-list">
          {preview.steps.map((step, index) => (
            <div className="offseason-step-row" key={step.id}>
              <span className="offseason-step-number">{index + 1}</span>
              <div>
                <strong>{step.title}</strong>
                <span>{step.summary}</span>
              </div>
              <em>{step.isImplemented ? 'Ready' : 'Planned'}</em>
            </div>
          ))}
        </div>
      </article>

      <section className="result-grid">
        <WatchPanel title="Contract Watch" label="Expiring" players={preview.expiringPlayers} empty="No urgent contract expiries." />
        <WatchPanel title="Development Watch" label="Upside" players={developmentWatch} empty="No major prospect jumps flagged." />
        <WatchPanel title="Veteran Watch" label="Age Curve" players={veteranWatch} empty="No older-player regression concerns." />
        <WatchPanel title="Retirement Watch" label="Late Career" players={preview.retiringPlayers} empty="No likely retirements flagged." />
      </section>
    </section>
  );
}

function SummaryCard({ label, value, helper }: { label: string; value: string; helper: string }) {
  return (
    <article className="panel roster-summary-card">
      <p className="eyebrow">{label}</p>
      <strong>{value}</strong>
      <span className="muted">{helper}</span>
    </article>
  );
}

function WatchPanel({
  title,
  label,
  players,
  empty,
}: {
  title: string;
  label: string;
  players: Team['roster'];
  empty: string;
}) {
  return (
    <article className="panel offseason-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">{label}</p>
          <h3>{title}</h3>
        </div>
        <span className="chip">{players.length}</span>
      </div>
      <div className="offseason-watch-list">
        {players.length === 0 && <span className="muted">{empty}</span>}
        {players.map((player) => (
          <div className="offseason-watch-row" key={player.id}>
            <div>
              <strong>{player.name}</strong>
              <span>{player.position} · {player.role} · age {player.age}</span>
            </div>
            <em>{player.overall}/{player.potential}</em>
          </div>
        ))}
      </div>
    </article>
  );
}
