import { derivePlayerRatingBreakdown, type AthleticRatingKey, type DefensiveRatingKey, type MentalRatingKey, type OffensiveRatingKey } from '../game/playerRatingBreakdown';
import type { Player } from '../types/basketball';

type PlayerAttributePanelProps = {
  player: Player;
};

const offensiveLabels: Record<OffensiveRatingKey, string> = {
  insideScoring: 'Inside',
  midRangeScoring: 'Mid-range',
  threePointScoring: 'Three-point',
  freeThrowScoring: 'Free throws',
  driving: 'Driving',
  postOffense: 'Post offense',
  passing: 'Passing',
  ballHandling: 'Ball handling',
  offensiveRebounding: 'Off. rebounding',
  shotIq: 'Shot IQ',
};

const defensiveLabels: Record<DefensiveRatingKey, string> = {
  perimeterDefence: 'Perimeter',
  interiorDefence: 'Interior',
  rimProtection: 'Rim protection',
  steals: 'Steals',
  defensiveRebounding: 'Def. rebounding',
  helpDefence: 'Help defence',
  defensiveIq: 'Defensive IQ',
  switchability: 'Switchability',
  physicality: 'Physicality',
  discipline: 'Discipline',
};

const athleticLabels: Record<AthleticRatingKey, string> = {
  speed: 'Speed',
  acceleration: 'Acceleration',
  strength: 'Strength',
  stamina: 'Stamina',
  vertical: 'Vertical',
  agility: 'Agility',
};

const mentalLabels: Record<MentalRatingKey, string> = {
  composure: 'Composure',
  leadership: 'Leadership',
  workRate: 'Work rate',
  consistency: 'Consistency',
  coachability: 'Coachability',
};

export function PlayerAttributePanel({ player }: PlayerAttributePanelProps) {
  const breakdown = derivePlayerRatingBreakdown(player);

  return (
    <article className="panel player-attribute-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Player Attribute Report</p>
          <h3>{player.name}</h3>
        </div>
        <span className="chip">{player.position} · {player.archetype}</span>
      </div>

      <div className="attribute-summary-strip">
        <AttributeScore label="Offense" value={breakdown.offense.overall} />
        <AttributeScore label="Defense" value={breakdown.defense.overall} />
        <AttributeScore label="Athleticism" value={breakdown.athleticism.overall} />
        <AttributeScore label="Mentality" value={breakdown.mentality.overall} />
      </div>

      <div className="attribute-breakdown-grid">
        <RatingGroup title="Offense" overall={breakdown.offense.overall} ratings={breakdown.offense.ratings} labels={offensiveLabels} />
        <RatingGroup title="Defense" overall={breakdown.defense.overall} ratings={breakdown.defense.ratings} labels={defensiveLabels} />
        <RatingGroup title="Athleticism" overall={breakdown.athleticism.overall} ratings={breakdown.athleticism.ratings} labels={athleticLabels} />
        <RatingGroup title="Mentality" overall={breakdown.mentality.overall} ratings={breakdown.mentality.ratings} labels={mentalLabels} />
      </div>
    </article>
  );
}

function AttributeScore({ label, value }: { label: string; value: number }) {
  return (
    <div className="attribute-score-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function RatingGroup<T extends string>({
  title,
  overall,
  ratings,
  labels,
}: {
  title: string;
  overall: number;
  ratings: Record<T, number>;
  labels: Record<T, string>;
}) {
  return (
    <section className="attribute-rating-group">
      <div className="attribute-group-header">
        <strong>{title}</strong>
        <span>{overall}</span>
      </div>
      <div className="attribute-rating-list">
        {(Object.keys(ratings) as T[]).map((key) => (
          <div className="attribute-rating-row" key={key}>
            <span>{labels[key]}</span>
            <div className="attribute-meter" aria-label={`${labels[key]} ${ratings[key]}`}>
              <div className="attribute-meter-fill" style={{ width: `${ratings[key]}%` }} />
            </div>
            <strong>{ratings[key]}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
