import type { TrainingFocus } from '../components/TrainingScreen';
import { defaultTactics, type TacticalSettings } from './tactics';
import type { SimulatedGameResult } from './simulateGame';
import type { PlayerConditionChange, PlayerDevelopmentChange, RotationPlan, Team } from '../types/basketball';
import { createEmptyCareerHistory, type CareerHistory, type CareerPhase } from '../types/careerSave';

const SAVE_KEY = 'hoop-dynasty-manager-save-v1';
const SAVE_BACKUP_KEY = 'hoop-dynasty-manager-save-v1-backup';
const SAVE_VERSION = 6;
const DEFAULT_TEAM_ID = 'bristol-breakers';
const DEFAULT_TRAINING_FOCUS: TrainingFocus = 'Balanced';
const DEFAULT_CAREER_PHASE: CareerPhase = 'Regular Season';

export type LocalSeasonSave = {
  version: number;
  currentSeason: number;
  careerPhase: CareerPhase;
  careerHistory: CareerHistory;
  rngSeed: number;
  rngCalls: number;
  playoffResults: SimulatedGameResult[];
  results: SimulatedGameResult[];
  selectedTeamId: string;
  selectedTeamState: Team | null;
  rotationPlan: RotationPlan | null;
  latestConditionReport: PlayerConditionChange[];
  latestDevelopmentReport: PlayerDevelopmentChange[];
  tactics: TacticalSettings;
  savedAt: string;
  trainingFocus: TrainingFocus;
};

export type LocalSeasonSaveMeta = {
  savedAt: string;
  teamId: string;
  version: number;
  resultsCount: number;
  bytes: number;
};

export type LocalSeasonCareerFields = {
  currentSeason?: number;
  careerPhase?: CareerPhase;
  careerHistory?: CareerHistory;
};

export function loadLocalSeasonSave(): LocalSeasonSave | null {
  try {
    const rawSave = window.localStorage.getItem(SAVE_KEY);
    if (!rawSave) return null;

    const parsedSave = JSON.parse(rawSave) as Partial<LocalSeasonSave>;
    return migrateSave(parsedSave);
  } catch {
    return null;
  }
}

export function saveLocalSeason(
  results: SimulatedGameResult[],
  tactics: TacticalSettings,
  playoffResults: SimulatedGameResult[] = [],
  selectedTeamId: string = DEFAULT_TEAM_ID,
  trainingFocus: TrainingFocus = 'Balanced',
  rotationPlan: RotationPlan | null = null,
  selectedTeamState: Team | null = null,
  latestConditionReport: PlayerConditionChange[] = [],
  latestDevelopmentReport: PlayerDevelopmentChange[] = [],
  rngSeed: number = 0,
  rngCalls: number = 0,
  careerFields: LocalSeasonCareerFields = {},
) {
  const existingCareerFields = readExistingCareerFields();
  const save: LocalSeasonSave = {
    version: SAVE_VERSION,
    currentSeason: normaliseSeasonNumber(careerFields.currentSeason ?? existingCareerFields.currentSeason),
    careerPhase: isCareerPhase(careerFields.careerPhase) ? careerFields.careerPhase : existingCareerFields.careerPhase,
    careerHistory: isCareerHistory(careerFields.careerHistory) ? careerFields.careerHistory : existingCareerFields.careerHistory,
    rngSeed,
    rngCalls,
    playoffResults,
    results,
    selectedTeamId,
    selectedTeamState,
    rotationPlan,
    latestConditionReport,
    latestDevelopmentReport,
    tactics,
    savedAt: new Date().toISOString(),
    trainingFocus,
  };

  try {
    const existing = window.localStorage.getItem(SAVE_KEY);
    if (existing) {
      window.localStorage.setItem(SAVE_BACKUP_KEY, existing);
    }
    window.localStorage.setItem(SAVE_KEY, JSON.stringify(save));
  } catch {
    // Ignore quota/private mode write failures; continue in-memory session.
  }

  return save;
}

export function clearLocalSeasonSave() {
  window.localStorage.removeItem(SAVE_KEY);
  window.localStorage.removeItem(SAVE_BACKUP_KEY);
}

export function exportLocalSeasonSave() {
  return window.localStorage.getItem(SAVE_KEY);
}

export function importLocalSeasonSave(rawSave: string) {
  try {
    const parsedSave = JSON.parse(rawSave) as Partial<LocalSeasonSave>;
    const migratedSave = migrateSave(parsedSave);
    if (!migratedSave) return null;
    window.localStorage.setItem(SAVE_KEY, JSON.stringify(migratedSave));
    return migratedSave;
  } catch {
    return null;
  }
}

export function restoreBackupLocalSeasonSave() {
  try {
    const backupRaw = window.localStorage.getItem(SAVE_BACKUP_KEY);
    if (!backupRaw) return null;

    const parsedSave = JSON.parse(backupRaw) as Partial<LocalSeasonSave>;
    const migratedSave = migrateSave(parsedSave);
    if (!migratedSave) return null;

    window.localStorage.setItem(SAVE_KEY, JSON.stringify(migratedSave));
    return migratedSave;
  } catch {
    return null;
  }
}

export function getBackupLocalSeasonSaveMeta(): Pick<LocalSeasonSaveMeta, 'savedAt' | 'teamId'> | null {
  try {
    const backupRaw = window.localStorage.getItem(SAVE_BACKUP_KEY);
    if (!backupRaw) return null;

    const parsedSave = JSON.parse(backupRaw) as Partial<LocalSeasonSave>;
    const migratedSave = migrateSave(parsedSave);
    if (!migratedSave) return null;

    return {
      savedAt: migratedSave.savedAt,
      teamId: migratedSave.selectedTeamId,
    };
  } catch {
    return null;
  }
}

// Temporary compatibility bridge for App.tsx while the oversized app shell is being stabilised.
// The long-term fix is to import this helper directly when App.tsx is refactored.
if (typeof globalThis !== 'undefined') {
  globalThis.getBackupLocalSeasonSaveMeta = getBackupLocalSeasonSaveMeta;
}

function migrateSave(save: Partial<LocalSeasonSave>): LocalSeasonSave | null {
  if (!Array.isArray(save.results) || !save.tactics) return null;

  return {
    version: SAVE_VERSION,
    currentSeason: normaliseSeasonNumber(save.currentSeason),
    careerPhase: isCareerPhase(save.careerPhase) ? save.careerPhase : DEFAULT_CAREER_PHASE,
    careerHistory: isCareerHistory(save.careerHistory) ? save.careerHistory : createEmptyCareerHistory(),
    rngSeed: typeof save.rngSeed === 'number' ? save.rngSeed : 0,
    rngCalls: typeof save.rngCalls === 'number' ? save.rngCalls : 0,
    playoffResults: Array.isArray(save.playoffResults) ? save.playoffResults as SimulatedGameResult[] : [],
    results: save.results as SimulatedGameResult[],
    selectedTeamId: save.selectedTeamId ?? DEFAULT_TEAM_ID,
    selectedTeamState: isTeam(save.selectedTeamState) ? save.selectedTeamState : null,
    rotationPlan: Array.isArray(save.rotationPlan) ? save.rotationPlan as RotationPlan : null,
    latestConditionReport: Array.isArray(save.latestConditionReport) ? save.latestConditionReport as PlayerConditionChange[] : [],
    latestDevelopmentReport: Array.isArray(save.latestDevelopmentReport) ? save.latestDevelopmentReport as PlayerDevelopmentChange[] : [],
    tactics: { ...defaultTactics, ...save.tactics },
    savedAt: save.savedAt ?? new Date().toISOString(),
    trainingFocus: isTrainingFocus(save.trainingFocus) ? save.trainingFocus : DEFAULT_TRAINING_FOCUS,
  };
}

function readExistingCareerFields(): Required<LocalSeasonCareerFields> {
  try {
    const rawSave = window.localStorage.getItem(SAVE_KEY);
    if (!rawSave) {
      return {
        currentSeason: 1,
        careerPhase: DEFAULT_CAREER_PHASE,
        careerHistory: createEmptyCareerHistory(),
      };
    }

    const parsedSave = JSON.parse(rawSave) as Partial<LocalSeasonSave>;

    return {
      currentSeason: normaliseSeasonNumber(parsedSave.currentSeason),
      careerPhase: isCareerPhase(parsedSave.careerPhase) ? parsedSave.careerPhase : DEFAULT_CAREER_PHASE,
      careerHistory: isCareerHistory(parsedSave.careerHistory) ? parsedSave.careerHistory : createEmptyCareerHistory(),
    };
  } catch {
    return {
      currentSeason: 1,
      careerPhase: DEFAULT_CAREER_PHASE,
      careerHistory: createEmptyCareerHistory(),
    };
  }
}

function normaliseSeasonNumber(value: unknown) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 1 ? Math.floor(value) : 1;
}

function isTrainingFocus(value: unknown): value is TrainingFocus {
  return value === 'Balanced' || value === 'Offense' || value === 'Defense' || value === 'Conditioning';
}

function isCareerPhase(value: unknown): value is CareerPhase {
  return value === 'Preseason' || value === 'Regular Season' || value === 'Playoffs' || value === 'Offseason';
}

function isCareerHistory(value: unknown): value is CareerHistory {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<CareerHistory>;

  return Array.isArray(candidate.champions)
    && Array.isArray(candidate.standingsArchive)
    && Array.isArray(candidate.resultArchive)
    && Boolean(candidate.managerRecord);
}

function isTeam(value: unknown): value is Team {
  return Boolean(value && typeof value === 'object' && 'id' in value && 'roster' in value && Array.isArray((value as Team).roster));
}
