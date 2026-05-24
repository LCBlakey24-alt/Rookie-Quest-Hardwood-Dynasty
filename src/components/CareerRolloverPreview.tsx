import { createDefaultRotation } from '../game/rotation';
import { createNextSeasonState } from '../game/careerRollover';
import type { SimulatedGameResult } from '../game/simulateGame';
import type { CareerHistory } from '../types/careerSave';
import type { Team } from '../types/basketball';

type CareerRolloverPreviewProps = {
  currentSeason?: number;
  selectedTeamId: string;
  teams: Team[];
  regularSeasonResults: SimulatedGameResult[];
  playoffResults: SimulatedGameResult[];
  history?: CareerHistory;
};

export function CareerRolloverPreview({
  currentSeason = 1,
  selectedTeamId,
  teams,
  regularSeasonResults,
  playoffResults,
  history,
}: CareerRolloverPreviewProps) {
  if (teams.length === 0) {
    return (
      <article className="panel rollover-preview-panel">
        <p className="eyebrow">Next Season</p>
        <h3>No teams available</h3>
        <p className="muted">The career rollover preview needs at least one team.</p>
      </article>
    );
  }

  const selectedTeam = teams.find((team) => team.id === selectedTeamId) ?? teams[0];
  const preview = createNextSeasonState({
    currentSeason,
    selectedTeamId: selectedTeam.id,
    teams,
    regularSeasonResults,
    playoffResults,
    history,
    rotationPlan: createDefaultRotation(selectedTeam),
  });

  return (
    <article className="panel rollover-preview-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Next Season Preview</p>
          <h3>Season {preview.nextSeason} setup</h3>
        </div>
        <span className="chip">{preview.nextPhase}</span>
      </div>

      <section className="roster-summary-grid">
        <SummaryCard label="Champion" value={preview.championRecord?.championTeamName ?? 'TBD'} helper={preview.championRecord ? `Seed ${preview.championRecord.championSeed ?? '—'}` : 'No champion archived'} />
        <SummaryCard label="History Seasons" value={preview.history.managerRecord.seasonsCompleted.toString()} helper="Completed seasons after rollover" />
        <SummaryCard label="Results Cleared" value={`${preview.regularSeasonResults.length}/${preview.playoffResults.length}`} helper="Regular/playoff results reset" />
        <SummaryCard label="Selected Club" value={preview.selectedTeam.shortName} helper={preview.selectedTeam.name} />
      </section>

      <div className="rollover-note-list">
        {preview.rolloverNotes.map((note) => (
          <div className="rollover-note-row" key={note}>
            <strong>•</strong>
            <span>{note}</span>
          </div>
        ))}
      </div>
    </article>
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
