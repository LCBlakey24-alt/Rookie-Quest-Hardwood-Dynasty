import type { TrainingFocus } from '../components/TrainingScreen';
import type { SimulatedGameResult } from '../game/simulateGame';
import type { TacticalSettings } from '../game/tactics';
import type { PlayerConditionChange, PlayerDevelopmentChange, RotationPlan, Standing, Team } from './basketball';

export type CareerPhase = 'Preseason' | 'Regular Season' | 'Playoffs' | 'Offseason';

export type CareerSaveVersion = 1;

export type SeasonChampionRecord = {
  seasonNumber: number;
  championTeamId: string;
  championTeamName: string;
  championSeed?: number;
  runnerUpTeamId?: string;
  runnerUpTeamName?: string;
};

export type SeasonStandingArchive = {
  seasonNumber: number;
  standings: Standing[];
};

export type SeasonResultArchive = {
  seasonNumber: number;
  regularSeasonResults: SimulatedGameResult[];
  playoffResults: SimulatedGameResult[];
};

export type ManagerCareerRecord = {
  seasonsCompleted: number;
  regularSeasonWins: number;
  regularSeasonLosses: number;
  playoffWins: number;
  playoffLosses: number;
  championships: number;
  bestRegularSeasonFinish?: number;
};

export type CareerHistory = {
  champions: SeasonChampionRecord[];
  standingsArchive: SeasonStandingArchive[];
  resultArchive: SeasonResultArchive[];
  managerRecord: ManagerCareerRecord;
};

export type CareerSave = {
  version: CareerSaveVersion;
  saveName: string;
  createdAt: string;
  updatedAt: string;
  currentSeason: number;
  currentPhase: CareerPhase;
  selectedTeamId: string;
  leagueTeams: Team[];
  selectedTeamState: Team;
  rotationPlan: RotationPlan;
  tactics: TacticalSettings;
  trainingFocus: TrainingFocus;
  regularSeasonResults: SimulatedGameResult[];
  playoffResults: SimulatedGameResult[];
  latestConditionReport: PlayerConditionChange[];
  latestDevelopmentReport: PlayerDevelopmentChange[];
  rngSeed: number;
  rngCalls: number;
  history: CareerHistory;
};

export function createEmptyCareerHistory(): CareerHistory {
  return {
    champions: [],
    standingsArchive: [],
    resultArchive: [],
    managerRecord: {
      seasonsCompleted: 0,
      regularSeasonWins: 0,
      regularSeasonLosses: 0,
      playoffWins: 0,
      playoffLosses: 0,
      championships: 0,
    },
  };
}
