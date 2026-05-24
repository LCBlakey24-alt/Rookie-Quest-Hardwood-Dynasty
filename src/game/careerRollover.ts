import { calculateStandings } from './calculateStandings';
import { progressRosterForOffseason } from './offseason';
import type { SimulatedGameResult } from './simulateGame';
import type { CareerHistory, CareerPhase, SeasonChampionRecord } from '../types/careerSave';
import { createEmptyCareerHistory } from '../types/careerSave';
import type { PlayerConditionChange, PlayerDevelopmentChange, RotationPlan, Team } from '../types/basketball';

export type CareerRolloverInput = {
  currentSeason: number;
  selectedTeamId: string;
  teams: Team[];
  regularSeasonResults: SimulatedGameResult[];
  playoffResults: SimulatedGameResult[];
  history?: CareerHistory;
  rotationPlan: RotationPlan;
  latestConditionReport?: PlayerConditionChange[];
  latestDevelopmentReport?: PlayerDevelopmentChange[];
};

export type CareerRolloverResult = {
  nextSeason: number;
  nextPhase: CareerPhase;
  teams: Team[];
  selectedTeam: Team;
  selectedTeamId: string;
  regularSeasonResults: SimulatedGameResult[];
  playoffResults: SimulatedGameResult[];
  rotationPlan: RotationPlan;
  latestConditionReport: PlayerConditionChange[];
  latestDevelopmentReport: PlayerDevelopmentChange[];
  history: CareerHistory;
  championRecord: SeasonChampionRecord | null;
  rolloverNotes: string[];
};

export function createNextSeasonState(input: CareerRolloverInput): CareerRolloverResult {
  const currentHistory = input.history ?? createEmptyCareerHistory();
  const standings = calculateStandings(input.teams, input.regularSeasonResults);
  const championRecord = createChampionRecord(input.currentSeason, input.playoffResults, input.teams, standings);
  const nextTeams = input.teams.map((team) => progressRosterForOffseason(resetTeamRecord(team)));
  const selectedTeam = nextTeams.find((team) => team.id === input.selectedTeamId) ?? nextTeams[0];

  if (!selectedTeam) {
    throw new Error('Cannot create next season state without at least one team.');
  }

  const nextHistory = archiveCompletedSeason({
    currentSeason: input.currentSeason,
    history: currentHistory,
    championRecord,
    standings,
    regularSeasonResults: input.regularSeasonResults,
    playoffResults: input.playoffResults,
    selectedTeamId: input.selectedTeamId,
  });

  return {
    nextSeason: input.currentSeason + 1,
    nextPhase: 'Regular Season',
    teams: nextTeams,
    selectedTeam,
    selectedTeamId: selectedTeam.id,
    regularSeasonResults: [],
    playoffResults: [],
    rotationPlan: input.rotationPlan,
    latestConditionReport: [],
    latestDevelopmentReport: [],
    history: nextHistory,
    championRecord,
    rolloverNotes: createRolloverNotes(input, championRecord, selectedTeam),
  };
}

export function archiveCompletedSeason(input: {
  currentSeason: number;
  history: CareerHistory;
  championRecord: SeasonChampionRecord | null;
  standings: ReturnType<typeof calculateStandings>;
  regularSeasonResults: SimulatedGameResult[];
  playoffResults: SimulatedGameResult[];
  selectedTeamId: string;
}): CareerHistory {
  const selectedStanding = input.standings.find((standing) => standing.teamId === input.selectedTeamId);
  const regularSeasonWins = selectedStanding?.wins ?? 0;
  const regularSeasonLosses = selectedStanding?.losses ?? 0;
  const playoffWins = input.playoffResults.filter((result) => result.winnerTeamId === input.selectedTeamId).length;
  const playoffLosses = input.playoffResults.filter((result) => (
    result.homeTeamId === input.selectedTeamId || result.awayTeamId === input.selectedTeamId
  ) && result.winnerTeamId !== input.selectedTeamId).length;
  const wonChampionship = input.championRecord?.championTeamId === input.selectedTeamId;
  const previousBestFinish = input.history.managerRecord.bestRegularSeasonFinish;
  const currentFinish = selectedStanding ? input.standings.findIndex((standing) => standing.teamId === input.selectedTeamId) + 1 : undefined;

  return {
    champions: input.championRecord
      ? [...input.history.champions.filter((record) => record.seasonNumber !== input.currentSeason), input.championRecord]
      : input.history.champions,
    standingsArchive: [
      ...input.history.standingsArchive.filter((archive) => archive.seasonNumber !== input.currentSeason),
      { seasonNumber: input.currentSeason, standings: input.standings },
    ],
    resultArchive: [
      ...input.history.resultArchive.filter((archive) => archive.seasonNumber !== input.currentSeason),
      {
        seasonNumber: input.currentSeason,
        regularSeasonResults: input.regularSeasonResults,
        playoffResults: input.playoffResults,
      },
    ],
    managerRecord: {
      seasonsCompleted: input.history.managerRecord.seasonsCompleted + 1,
      regularSeasonWins: input.history.managerRecord.regularSeasonWins + regularSeasonWins,
      regularSeasonLosses: input.history.managerRecord.regularSeasonLosses + regularSeasonLosses,
      playoffWins: input.history.managerRecord.playoffWins + playoffWins,
      playoffLosses: input.history.managerRecord.playoffLosses + playoffLosses,
      championships: input.history.managerRecord.championships + (wonChampionship ? 1 : 0),
      bestRegularSeasonFinish: currentFinish
        ? previousBestFinish
          ? Math.min(previousBestFinish, currentFinish)
          : currentFinish
        : previousBestFinish,
    },
  };
}

function createChampionRecord(
  seasonNumber: number,
  playoffResults: SimulatedGameResult[],
  teams: Team[],
  standings: ReturnType<typeof calculateStandings>,
): SeasonChampionRecord | null {
  const finalResult = playoffResults[playoffResults.length - 1];

  if (!finalResult) return null;

  const champion = teams.find((team) => team.id === finalResult.winnerTeamId);
  const runnerUpTeamId = finalResult.homeTeamId === finalResult.winnerTeamId ? finalResult.awayTeamId : finalResult.homeTeamId;
  const runnerUp = teams.find((team) => team.id === runnerUpTeamId);
  const championSeed = standings.findIndex((standing) => standing.teamId === finalResult.winnerTeamId) + 1;

  return {
    seasonNumber,
    championTeamId: finalResult.winnerTeamId,
    championTeamName: champion?.name ?? finalResult.winnerTeamId,
    championSeed: championSeed > 0 ? championSeed : undefined,
    runnerUpTeamId,
    runnerUpTeamName: runnerUp?.name ?? runnerUpTeamId,
  };
}

function resetTeamRecord(team: Team): Team {
  return {
    ...team,
    record: {
      wins: 0,
      losses: 0,
    },
  };
}

function createRolloverNotes(input: CareerRolloverInput, champion: SeasonChampionRecord | null, selectedTeam: Team) {
  const expiringCount = selectedTeam.roster.filter((player) => (player.contract?.yearsRemaining ?? 1) <= 0).length;
  const veteranCount = selectedTeam.roster.filter((player) => player.age >= 32).length;
  const developmentCount = selectedTeam.roster.filter((player) => player.age <= 24 && player.potential > player.overall).length;

  return [
    champion ? `${champion.championTeamName} archived as Season ${input.currentSeason} champions.` : `Season ${input.currentSeason} archived without a confirmed champion.`,
    `Season ${input.currentSeason + 1} created with regular-season and playoff results cleared.`,
    `${expiringCount} player${expiringCount === 1 ? '' : 's'} now need contract attention.`,
    `${veteranCount} veteran${veteranCount === 1 ? '' : 's'} should be monitored for regression risk.`,
    `${developmentCount} young player${developmentCount === 1 ? '' : 's'} remain on the development watch list.`,
  ];
}
