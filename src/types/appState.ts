export type ActiveView = 'Landing' | 'Dashboard' | 'Inbox' | 'Team Select' | 'Roster' | 'Development' | 'Contracts' | 'Free Agents' | 'Board & Finance' | 'Tactics' | 'Schedule' | 'Results' | 'League' | 'Playoffs' | 'Summary' | 'Training';

export type DisplayDensity = 'Normal' | 'Compact' | 'Ultra';

export type FocusMode = 'My Team' | 'League';

export type MotionMode = 'Standard' | 'Reduced';

export type SimKeyEvent = 'Next My Game' | 'Playoffs Start' | 'Season End';

export const SIM_KEY_EVENT_HINTS: Record<SimKeyEvent, string> = {
  'Next My Game': 'Advance until your club appears again on the schedule.',
  'Playoffs Start': 'Fast-forward through the remaining regular-season fixtures.',
  'Season End': 'Sim every remaining regular-season and playoff game.',
};
