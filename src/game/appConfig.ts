import { Activity, Banknote, BarChart3, CalendarDays, ClipboardList, Dumbbell, FileText, Inbox, Medal, ScrollText, Shield, Trophy, TrendingUp, UserPlus, Users } from 'lucide-react';
import { seasonFixtures } from '../data/fixtures';
import type { ActiveView } from '../types/appState';

export const DEFAULT_TEAM_ID = 'bristol-breakers';

export const DISPLAY_DENSITY_STORAGE_KEY = 'hoop-dynasty-display-density';
export const FOCUS_MODE_STORAGE_KEY = 'hoop-dynasty-focus-mode';
export const MOTION_MODE_STORAGE_KEY = 'hoop-dynasty-motion-mode';
export const INTRO_VISIBILITY_STORAGE_KEY = 'hoop-dynasty-hide-intro';

export const totalRounds = Math.max(...seasonFixtures.map((fixture) => fixture.round));

export const navItems = [
  { label: 'Dashboard', icon: Activity, enabled: true },
  { label: 'Inbox', icon: Inbox, enabled: true },
  { label: 'Team Select', icon: Users, enabled: true },
  { label: 'Roster', icon: Users, enabled: true },
  { label: 'Development', icon: TrendingUp, enabled: true },
  { label: 'Contracts', icon: ScrollText, enabled: true },
  { label: 'Free Agents', icon: UserPlus, enabled: true },
  { label: 'Board & Finance', icon: Banknote, enabled: true },
  { label: 'Tactics', icon: Shield, enabled: true },
  { label: 'Schedule', icon: CalendarDays, enabled: true },
  { label: 'Results', icon: ClipboardList, enabled: true },
  { label: 'League', icon: Trophy, enabled: true },
  { label: 'Playoffs', icon: Medal, enabled: true },
  { label: 'Summary', icon: FileText, enabled: true },
  { label: 'Training', icon: Dumbbell, enabled: true },
  { label: 'Analytics', icon: BarChart3, enabled: false },
] satisfies Array<{ label: ActiveView | 'Analytics'; icon: typeof Activity; enabled: boolean }>;
