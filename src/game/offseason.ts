import type { CareerHistory, SeasonChampionRecord } from '../types/careerSave';
import type { Player, Team } from '../types/basketball';
import type { SimulatedGameResult } from './simulateGame';

export type OffseasonStepId =
  | 'season-recap'
  | 'age-players'
  | 'development-regression'
  | 'contracts-expire'
  | 'free-agent-refresh'
  | 'board-objectives'
  | 'fixture-generation'
  | 'start-next-season';

export type OffseasonStep = {
  id: OffseasonStepId;
  title: string;
  summary: string;
  isImplemented: boolean;
};

export type OffseasonPreview = {
  completedSeason: number;
  nextSeason: number;
  champion?: SeasonChampionRecord;
  retiringPlayers: Player[];
  expiringPlayers: Player[];
  developmentCandidates: Player[];
  regressionCandidates: Player[];
  steps: OffseasonStep[];
};

export const offseasonSteps: OffseasonStep[] = [
  {
    id: 'season-recap',
    title: 'Season Recap',
    summary: 'Archive champion, standings, results and manager record.',
    isImplemented: false,
  },
  {
    id: 'age-players',
    title: 'Age Players',
    summary: 'Move every player one year older and prepare age-related changes.',
    isImplemented: false,
  },
  {
    id: 'development-regression',
    title: 'Development / Regression',
    summary: 'Improve high-upside players and gently regress older players.',
    isImplemented: false,
  },
  {
    id: 'contracts-expire',
    title: 'Contracts Expire',
    summary: 'Reduce contract years and move expired players into the market.',
    isImplemented: false,
  },
  {
    id: 'free-agent-refresh',
    title: 'Free Agent Refresh',
    summary: 'Refresh recruitment market for the new season.',
    isImplemented: false,
  },
  {
    id: 'board-objectives',
    title: 'Board Objectives',
    summary: 'Set fresh expectations based on reputation, finances and previous season.',
    isImplemented: false,
  },
  {
    id: 'fixture-generation',
    title: 'Fixture Generation',
    summary: 'Generate or load the next regular-season schedule.',
    isImplemented: false,
  },
  {
    id: 'start-next-season',
    title: 'Start Next Season',
    summary: 'Switch career phase back to regular season and begin the next campaign.',
    isImplemented: false,
  },
];

export function createOffseasonPreview(input: {
  completedSeason: number;
  teams: Team[];
  selectedTeamId: string;
  playoffResults: SimulatedGameResult[];
  history: CareerHistory;
}): OffseasonPreview {
  const selectedTeam = input.teams.find((team) => team.id === input.selectedTeamId);
  const champion = input.history.champions.find((record) => record.seasonNumber === input.completedSeason);
  const roster = selectedTeam?.roster ?? [];

  return {
    completedSeason: input.completedSeason,
    nextSeason: input.completedSeason + 1,
    champion,
    retiringPlayers: roster.filter((player) => player.age >= 37),
    expiringPlayers: roster.filter((player) => (player.contract?.yearsRemaining ?? 1) <= 1),
    developmentCandidates: roster.filter((player) => player.age <= 24 && player.potential > player.overall),
    regressionCandidates: roster.filter((player) => player.age >= 32),
    steps: offseasonSteps,
  };
}

export function progressPlayerAge(player: Player): Player {
  return {
    ...player,
    age: player.age + 1,
  };
}

export function progressContractYear(player: Player): Player {
  if (!player.contract) return player;

  const yearsRemaining = Math.max(0, player.contract.yearsRemaining - 1);

  return {
    ...player,
    contract: {
      ...player.contract,
      yearsRemaining,
      status: yearsRemaining === 0 ? 'Renewal Needed' : yearsRemaining === 1 ? 'Expiring' : player.contract.status,
    },
  };
}

export function progressRosterForOffseason(team: Team): Team {
  return {
    ...team,
    roster: team.roster.map((player) => progressContractYear(progressPlayerAge(player))),
  };
}
