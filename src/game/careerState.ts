import { createEmptyCareerHistory, type CareerHistory, type CareerPhase } from '../types/careerSave';
import type { LocalSeasonCareerFields, LocalSeasonSave } from './localSave';

export type CareerState = {
  currentSeason: number;
  careerPhase: CareerPhase;
  careerHistory: CareerHistory;
};

export const DEFAULT_CAREER_STATE: CareerState = {
  currentSeason: 1,
  careerPhase: 'Regular Season',
  careerHistory: createEmptyCareerHistory(),
};

export function createCareerStateFromSave(save: LocalSeasonSave | null): CareerState {
  if (!save) return DEFAULT_CAREER_STATE;

  return {
    currentSeason: save.currentSeason >= 1 ? save.currentSeason : DEFAULT_CAREER_STATE.currentSeason,
    careerPhase: save.careerPhase,
    careerHistory: save.careerHistory,
  };
}

export function toLocalSeasonCareerFields(state: CareerState): LocalSeasonCareerFields {
  return {
    currentSeason: state.currentSeason,
    careerPhase: state.careerPhase,
    careerHistory: state.careerHistory,
  };
}

export function createCareerStatePatch(current: CareerState, patch: Partial<CareerState>): CareerState {
  return {
    currentSeason: patch.currentSeason ?? current.currentSeason,
    careerPhase: patch.careerPhase ?? current.careerPhase,
    careerHistory: patch.careerHistory ?? current.careerHistory,
  };
}
