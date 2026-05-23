export {};

declare global {
  type MotionMode = 'Standard' | 'Reduced';

  function getBackupLocalSeasonSaveMeta(): {
    savedAt: string;
    teamId: string;
  } | null;
}
