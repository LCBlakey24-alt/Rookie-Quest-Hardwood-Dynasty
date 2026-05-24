import { createEmptyCareerHistory } from '../types/careerSave';
import type { SimulatedGameResult } from '../game/simulateGame';
import type { Team } from '../types/basketball';
import { OffseasonScreen } from './OffseasonScreen';

type SeasonSummaryOffseasonPreviewProps = {
  isUnlocked: boolean;
  playoffResults: SimulatedGameResult[];
  selectedTeamId: string;
  teams: Team[];
};

export function SeasonSummaryOffseasonPreview({
  isUnlocked,
  playoffResults,
  selectedTeamId,
  teams,
}: SeasonSummaryOffseasonPreviewProps) {
  if (!isUnlocked) {
    return (
      <article className="panel season-summary-panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Offseason Preview</p>
            <h3>Complete the season first</h3>
          </div>
          <span className="chip">Locked</span>
        </div>
        <div className="assistant-notes">
          <div className="assistant-note">
            <strong>Season rollover</strong>
            <span>Finish the playoffs and confirm a champion to unlock offseason planning.</span>
          </div>
          <div className="assistant-note">
            <strong>Coming next</strong>
            <span>Ageing, contract review, development watch, veteran risk and next-season setup.</span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <OffseasonScreen
      completedSeason={1}
      history={createEmptyCareerHistory()}
      playoffResults={playoffResults}
      selectedTeamId={selectedTeamId}
      teams={teams}
    />
  );
}
