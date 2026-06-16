import { DEFAULT_CAREER_STATE, createCareerStateFromSave, type CareerState } from '../game/careerState';
import { loadLocalSeasonSave } from '../game/localSave';

type CareerStatusPanelProps = {
  careerState?: CareerState;
};

export function CareerStatusPanel({ careerState }: CareerStatusPanelProps) {
  const resolvedCareerState = careerState ?? getSavedCareerState();
  const { currentSeason, careerPhase, careerHistory } = resolvedCareerState;
  const managerRecord = careerHistory.managerRecord;
  const totalGames = managerRecord.regularSeasonWins + managerRecord.regularSeasonLosses;
  const winRate = totalGames > 0 ? Math.round((managerRecord.regularSeasonWins / totalGames) * 100) : 0;
  const latestChampion = [...careerHistory.champions].sort((a, b) => b.seasonNumber - a.seasonNumber)[0];

  return (
    <article className="panel career-status-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Career Status</p>
          <h3>Season {currentSeason}</h3>
        </div>
        <span className="chip">{careerPhase}</span>
      </div>

      <section className="career-status-grid">
        <CareerStatusStat label="Completed" value={managerRecord.seasonsCompleted.toString()} helper="Seasons archived" />
        <CareerStatusStat label="Win Rate" value={`${winRate}%`} helper={`${managerRecord.regularSeasonWins}-${managerRecord.regularSeasonLosses} regular season`} />
        <CareerStatusStat label="Titles" value={managerRecord.championships.toString()} helper="Manager championships" />
        <CareerStatusStat label="Best Finish" value={managerRecord.bestRegularSeasonFinish ? ordinal(managerRecord.bestRegularSeasonFinish) : '—'} helper="Regular season high" />
      </section>

      <div className="career-status-note">
        <strong>{latestChampion ? `Last Champion: ${latestChampion.championTeamName}` : 'No champion archived yet'}</strong>
        <span>{latestChampion ? `Season ${latestChampion.seasonNumber} title record is stored in career history.` : 'Complete a playoff run and start the next season to build career history.'}</span>
      </div>
    </article>
  );
}

function getSavedCareerState(): CareerState {
  if (typeof window === 'undefined') return DEFAULT_CAREER_STATE;
  return createCareerStateFromSave(loadLocalSeasonSave());
}

function CareerStatusStat({ label, value, helper }: { label: string; value: string; helper: string }) {
  return (
    <div className="career-status-stat">
      <p className="eyebrow">{label}</p>
      <strong>{value}</strong>
      <span>{helper}</span>
    </div>
  );
}

function ordinal(position: number) {
  const suffix = position % 10 === 1 && position !== 11
    ? 'st'
    : position % 10 === 2 && position !== 12
      ? 'nd'
      : position % 10 === 3 && position !== 13
        ? 'rd'
        : 'th';

  return `${position}${suffix}`;
}
