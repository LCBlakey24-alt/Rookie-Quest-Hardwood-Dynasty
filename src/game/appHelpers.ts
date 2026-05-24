import { teams } from '../data/teams';
import type { SimulatedGameResult } from './simulateGame';
import type { Fixture, Team } from '../types/basketball';

export function getTeam(teamId: string, teamList: Team[] = teams): Team {
  const team = teamList.find((candidate) => candidate.id === teamId);

  if (!team) {
    throw new Error(`Team not found: ${teamId}`);
  }

  return team;
}

export function mergeTeamState(teamList: Team[], managedTeam: Team) {
  return teamList.map((team) => (team.id === managedTeam.id ? managedTeam : team));
}

export function hasResultForFixture(fixture: Fixture, results: SimulatedGameResult[]) {
  return results.some((result) => isResultForFixture(fixture, result));
}

export function isResultForFixture(fixture: Fixture, result: SimulatedGameResult) {
  return result.homeTeamId === fixture.homeTeamId && result.awayTeamId === fixture.awayTeamId;
}

export function getOrdinalPosition(position: number) {
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
