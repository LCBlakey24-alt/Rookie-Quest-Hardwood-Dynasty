import type { Player } from '../types/basketball';

export type OffensiveRatingKey =
  | 'insideScoring'
  | 'midRangeScoring'
  | 'threePointScoring'
  | 'freeThrowScoring'
  | 'driving'
  | 'postOffense'
  | 'passing'
  | 'ballHandling'
  | 'offensiveRebounding'
  | 'shotIq';

export type DefensiveRatingKey =
  | 'perimeterDefence'
  | 'interiorDefence'
  | 'rimProtection'
  | 'steals'
  | 'defensiveRebounding'
  | 'helpDefence'
  | 'defensiveIq'
  | 'switchability'
  | 'physicality'
  | 'discipline';

export type AthleticRatingKey =
  | 'speed'
  | 'acceleration'
  | 'strength'
  | 'stamina'
  | 'vertical'
  | 'agility';

export type MentalRatingKey =
  | 'composure'
  | 'leadership'
  | 'workRate'
  | 'consistency'
  | 'coachability';

export type PlayerRatingBreakdown = {
  offense: {
    overall: number;
    ratings: Record<OffensiveRatingKey, number>;
  };
  defense: {
    overall: number;
    ratings: Record<DefensiveRatingKey, number>;
  };
  athleticism: {
    overall: number;
    ratings: Record<AthleticRatingKey, number>;
  };
  mentality: {
    overall: number;
    ratings: Record<MentalRatingKey, number>;
  };
};

const offensiveWeights: Record<OffensiveRatingKey, number> = {
  insideScoring: 1,
  midRangeScoring: 0.9,
  threePointScoring: 1,
  freeThrowScoring: 0.55,
  driving: 0.85,
  postOffense: 0.65,
  passing: 0.95,
  ballHandling: 0.9,
  offensiveRebounding: 0.45,
  shotIq: 1,
};

const defensiveWeights: Record<DefensiveRatingKey, number> = {
  perimeterDefence: 1,
  interiorDefence: 0.9,
  rimProtection: 0.85,
  steals: 0.65,
  defensiveRebounding: 0.75,
  helpDefence: 0.9,
  defensiveIq: 1,
  switchability: 0.75,
  physicality: 0.65,
  discipline: 0.75,
};

const athleticWeights: Record<AthleticRatingKey, number> = {
  speed: 1,
  acceleration: 0.9,
  strength: 0.85,
  stamina: 0.9,
  vertical: 0.65,
  agility: 0.85,
};

const mentalWeights: Record<MentalRatingKey, number> = {
  composure: 0.95,
  leadership: 0.75,
  workRate: 0.9,
  consistency: 1,
  coachability: 0.8,
};

export function derivePlayerRatingBreakdown(player: Player): PlayerRatingBreakdown {
  const base = player.overall;
  const potentialGap = Math.max(0, player.potential - player.overall);
  const formModifier = Math.round((player.form - 70) / 8);
  const moraleModifier = Math.round((player.morale - 70) / 10);
  const fatiguePenalty = Math.round((player.fatigue ?? 0) / 18);
  const injuryPenalty = player.injury ? 4 : 0;
  const contextModifier = formModifier + moraleModifier - fatiguePenalty - injuryPenalty;

  const offenseRatings: Record<OffensiveRatingKey, number> = {
    insideScoring: byArchetype(player, base, { Slasher: 7, 'Stretch Big': -1, 'Rim Protector': -2 }),
    midRangeScoring: byArchetype(player, base, { Sharpshooter: 4, 'Floor General': 3, 'Two-Way Wing': 2 }),
    threePointScoring: byArchetype(player, base, { Sharpshooter: 9, 'Stretch Big': 7, 'Floor General': 3, 'Rim Protector': -8, 'Glass Cleaner': -6 }),
    freeThrowScoring: clampRating(base + (player.position === 'PG' || player.position === 'SG' ? 4 : -1)),
    driving: byArchetype(player, base, { Slasher: 9, 'Two-Way Wing': 4, 'Floor General': 3, 'Rim Protector': -5 }),
    postOffense: clampRating(base + (player.position === 'C' || player.position === 'PF' ? 5 : -6)),
    passing: byArchetype(player, base, { 'Floor General': 10, 'Playmaking Big': 8, 'Veteran Leader': 5, Sharpshooter: -1 }),
    ballHandling: clampRating(base + (player.position === 'PG' ? 8 : player.position === 'SG' ? 4 : player.position === 'C' ? -8 : -1)),
    offensiveRebounding: byArchetype(player, base, { 'Glass Cleaner': 10, 'Rim Protector': 5, 'Stretch Big': 2, 'Floor General': -8, Sharpshooter: -5 }),
    shotIq: byArchetype(player, base, { 'Floor General': 7, 'Veteran Leader': 8, Sharpshooter: 4, 'Raw Prospect': -5 }),
  };

  const defenseRatings: Record<DefensiveRatingKey, number> = {
    perimeterDefence: byArchetype(player, base, { 'Lockdown Defender': 10, 'Two-Way Wing': 7, 'Floor General': 2, 'Rim Protector': -3 }),
    interiorDefence: clampRating(base + (player.position === 'C' || player.position === 'PF' ? 6 : -4)),
    rimProtection: byArchetype(player, base, { 'Rim Protector': 11, 'Glass Cleaner': 5, 'Stretch Big': 2, 'Floor General': -8, Sharpshooter: -6 }),
    steals: byArchetype(player, base, { 'Lockdown Defender': 7, 'Two-Way Wing': 4, 'Floor General': 3, 'Rim Protector': -4 }),
    defensiveRebounding: byArchetype(player, base, { 'Glass Cleaner': 11, 'Rim Protector': 6, 'Stretch Big': 3, 'Floor General': -7 }),
    helpDefence: byArchetype(player, base, { 'Veteran Leader': 6, 'Lockdown Defender': 5, 'Two-Way Wing': 4, 'Raw Prospect': -5 }),
    defensiveIq: byArchetype(player, base, { 'Veteran Leader': 8, 'Lockdown Defender': 6, 'Floor General': 4, 'Raw Prospect': -6 }),
    switchability: byArchetype(player, base, { 'Two-Way Wing': 8, 'Lockdown Defender': 5, 'Stretch Big': 2, 'Rim Protector': -2 }),
    physicality: clampRating(base + (player.position === 'C' || player.position === 'PF' ? 5 : -1)),
    discipline: byArchetype(player, base, { 'Veteran Leader': 7, 'Floor General': 5, 'Raw Prospect': -7 }),
  };

  const athleticRatings: Record<AthleticRatingKey, number> = {
    speed: clampRating(base + (player.position === 'PG' ? 7 : player.position === 'C' ? -6 : 1)),
    acceleration: clampRating(base + (player.position === 'PG' || player.position === 'SG' ? 5 : player.position === 'C' ? -5 : 0)),
    strength: clampRating(base + (player.position === 'C' || player.position === 'PF' ? 7 : -2)),
    stamina: clampRating(base + 2 - fatiguePenalty),
    vertical: byArchetype(player, base, { Slasher: 6, 'Rim Protector': 5, 'Glass Cleaner': 4, 'Floor General': -2 }),
    agility: clampRating(base + (player.position === 'PG' || player.position === 'SG' ? 5 : player.position === 'C' ? -5 : 0)),
  };

  const mentalRatings: Record<MentalRatingKey, number> = {
    composure: byArchetype(player, base, { 'Veteran Leader': 9, 'Floor General': 6, 'Raw Prospect': -7 }),
    leadership: byArchetype(player, base, { 'Veteran Leader': 10, 'Floor General': 7, 'Raw Prospect': -6 }),
    workRate: clampRating(base + Math.min(6, Math.round(potentialGap / 2))),
    consistency: clampRating(base + moraleModifier + formModifier),
    coachability: clampRating(base + (player.role === 'Prospect' ? 5 : player.role === 'Starter' ? 1 : 2)),
  };

  const adjustedOffense = addContext(offenseRatings, contextModifier);
  const adjustedDefense = addContext(defenseRatings, Math.round(contextModifier * 0.75));
  const adjustedAthleticism = addContext(athleticRatings, -fatiguePenalty - injuryPenalty);
  const adjustedMentality = addContext(mentalRatings, moraleModifier + formModifier);

  return {
    offense: {
      overall: weightedAverage(adjustedOffense, offensiveWeights),
      ratings: adjustedOffense,
    },
    defense: {
      overall: weightedAverage(adjustedDefense, defensiveWeights),
      ratings: adjustedDefense,
    },
    athleticism: {
      overall: weightedAverage(adjustedAthleticism, athleticWeights),
      ratings: adjustedAthleticism,
    },
    mentality: {
      overall: weightedAverage(adjustedMentality, mentalWeights),
      ratings: adjustedMentality,
    },
  };
}

function byArchetype(player: Player, base: number, adjustments: Partial<Record<Player['archetype'], number>>) {
  return clampRating(base + (adjustments[player.archetype] ?? 0));
}

function addContext<T extends string>(ratings: Record<T, number>, modifier: number): Record<T, number> {
  return Object.fromEntries(
    Object.entries(ratings).map(([key, value]) => [key, clampRating((value as number) + modifier)]),
  ) as Record<T, number>;
}

function weightedAverage<T extends string>(ratings: Record<T, number>, weights: Record<T, number>) {
  const entries = Object.entries(ratings) as Array<[T, number]>;
  const totalWeight = entries.reduce((total, [key]) => total + weights[key], 0);
  const total = entries.reduce((sum, [key, value]) => sum + value * weights[key], 0);
  return Math.round(total / totalWeight);
}

function clampRating(value: number) {
  return Math.max(25, Math.min(99, Math.round(value)));
}
