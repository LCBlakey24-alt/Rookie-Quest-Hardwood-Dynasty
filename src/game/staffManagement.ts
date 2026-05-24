import type { Player, Team } from '../types/basketball';

export type StaffRole =
  | 'Assistant Coach'
  | 'Head Scout'
  | 'Development Coach'
  | 'Physio'
  | 'General Manager'
  | 'Data Analyst';

export type StaffTask =
  | 'Rotation Advice'
  | 'Player Evaluation'
  | 'Scouting Reports'
  | 'Training Plans'
  | 'Injury Management'
  | 'Contract Recommendations'
  | 'Free Agent Shortlist'
  | 'Opponent Preview';

export type StaffMember = {
  id: string;
  name: string;
  role: StaffRole;
  salary: number;
  contractYears: number;
  evaluation: number;
  development: number;
  tacticalKnowledge: number;
  medical: number;
  scouting: number;
  negotiation: number;
  analytics: number;
  personality: 'Balanced' | 'Conservative' | 'Aggressive' | 'Youth Focused' | 'Win Now' | 'Data Driven';
  assignedTasks: StaffTask[];
};

export type StaffBudget = {
  annualBudget: number;
  usedBudget: number;
  maxStaffSlots: number;
};

export type StaffOpinion = {
  playerId: string;
  playerName: string;
  staffId: string;
  staffName: string;
  role: StaffRole;
  confidence: number;
  summary: string;
  recommendedAction: string;
  perceivedCurrentAbility: number;
  perceivedPotential: number;
  riskFlags: string[];
};

export type DelegatedStaffReport = {
  task: StaffTask;
  assignedStaff: StaffMember | null;
  quality: number;
  summary: string;
  recommendations: string[];
};

export const starterStaffPool: StaffMember[] = [
  {
    id: 'staff-mara-owen',
    name: 'Mara Owen',
    role: 'Assistant Coach',
    salary: 42000,
    contractYears: 2,
    evaluation: 72,
    development: 66,
    tacticalKnowledge: 78,
    medical: 42,
    scouting: 55,
    negotiation: 48,
    analytics: 62,
    personality: 'Balanced',
    assignedTasks: ['Rotation Advice', 'Opponent Preview'],
  },
  {
    id: 'staff-jalen-reece',
    name: 'Jalen Reece',
    role: 'Head Scout',
    salary: 36000,
    contractYears: 1,
    evaluation: 76,
    development: 58,
    tacticalKnowledge: 54,
    medical: 35,
    scouting: 82,
    negotiation: 52,
    analytics: 68,
    personality: 'Data Driven',
    assignedTasks: ['Player Evaluation', 'Scouting Reports', 'Free Agent Shortlist'],
  },
  {
    id: 'staff-elsie-ward',
    name: 'Elsie Ward',
    role: 'Development Coach',
    salary: 31000,
    contractYears: 2,
    evaluation: 64,
    development: 84,
    tacticalKnowledge: 60,
    medical: 48,
    scouting: 50,
    negotiation: 38,
    analytics: 58,
    personality: 'Youth Focused',
    assignedTasks: ['Training Plans'],
  },
  {
    id: 'staff-tommy-kaur',
    name: 'Tommy Kaur',
    role: 'Physio',
    salary: 28000,
    contractYears: 1,
    evaluation: 46,
    development: 50,
    tacticalKnowledge: 32,
    medical: 86,
    scouting: 30,
    negotiation: 35,
    analytics: 54,
    personality: 'Conservative',
    assignedTasks: ['Injury Management'],
  },
];

export function calculateStaffBudget(team: Team): StaffBudget {
  const reputationMultiplier = team.reputation >= 80 ? 1.45 : team.reputation >= 70 ? 1.15 : team.reputation >= 62 ? 0.95 : 0.75;
  const titleMultiplier = Math.min(1.25, 1 + team.championships * 0.025);
  const annualBudget = Math.round(160000 * reputationMultiplier * titleMultiplier);
  const maxStaffSlots = team.reputation >= 80 ? 7 : team.reputation >= 70 ? 6 : team.reputation >= 62 ? 5 : 4;

  return {
    annualBudget,
    usedBudget: 0,
    maxStaffSlots,
  };
}

export function calculateUsedStaffBudget(staff: StaffMember[]) {
  return staff.reduce((total, member) => total + member.salary, 0);
}

export function canHireStaffMember(staff: StaffMember[], candidate: StaffMember, budget: StaffBudget) {
  const usedBudget = calculateUsedStaffBudget(staff);

  return {
    canHire: staff.length < budget.maxStaffSlots && usedBudget + candidate.salary <= budget.annualBudget,
    projectedBudget: usedBudget + candidate.salary,
    remainingSlots: Math.max(0, budget.maxStaffSlots - staff.length),
    remainingBudget: Math.max(0, budget.annualBudget - usedBudget - candidate.salary),
  };
}

export function getBestStaffForTask(staff: StaffMember[], task: StaffTask): StaffMember | null {
  const assigned = staff.filter((member) => member.assignedTasks.includes(task));
  const candidates = assigned.length ? assigned : staff;

  return [...candidates].sort((a, b) => getStaffTaskQuality(b, task) - getStaffTaskQuality(a, task))[0] ?? null;
}

export function getStaffTaskQuality(member: StaffMember, task: StaffTask) {
  if (task === 'Rotation Advice') return weightedScore(member.tacticalKnowledge, member.evaluation, member.analytics);
  if (task === 'Player Evaluation') return weightedScore(member.evaluation, member.scouting, member.analytics);
  if (task === 'Scouting Reports') return weightedScore(member.scouting, member.evaluation, member.analytics);
  if (task === 'Training Plans') return weightedScore(member.development, member.tacticalKnowledge, member.evaluation);
  if (task === 'Injury Management') return weightedScore(member.medical, member.evaluation, member.development);
  if (task === 'Contract Recommendations') return weightedScore(member.negotiation, member.evaluation, member.analytics);
  if (task === 'Free Agent Shortlist') return weightedScore(member.scouting, member.negotiation, member.evaluation);
  if (task === 'Opponent Preview') return weightedScore(member.tacticalKnowledge, member.analytics, member.scouting);
  return member.evaluation;
}

export function createStaffOpinion(player: Player, staff: StaffMember): StaffOpinion {
  const quality = getStaffTaskQuality(staff, 'Player Evaluation');
  const personalityModifier = getPersonalityPotentialModifier(staff);
  const uncertainty = Math.round((100 - quality) / 6);
  const perceivedCurrentAbility = clampRating(player.overall + getBiasForPlayer(player, staff) - uncertainty);
  const perceivedPotential = clampRating(player.potential + personalityModifier - Math.round(uncertainty / 2));
  const riskFlags = createRiskFlags(player, staff);

  return {
    playerId: player.id,
    playerName: player.name,
    staffId: staff.id,
    staffName: staff.name,
    role: staff.role,
    confidence: quality,
    summary: createOpinionSummary(player, staff, perceivedCurrentAbility, perceivedPotential),
    recommendedAction: createRecommendedAction(player, staff, perceivedCurrentAbility, perceivedPotential),
    perceivedCurrentAbility,
    perceivedPotential,
    riskFlags,
  };
}

export function createDelegatedStaffReport(task: StaffTask, staff: StaffMember[], team: Team): DelegatedStaffReport {
  const assignedStaff = getBestStaffForTask(staff, task);
  const quality = assignedStaff ? getStaffTaskQuality(assignedStaff, task) : 35;

  return {
    task,
    assignedStaff,
    quality,
    summary: assignedStaff
      ? `${assignedStaff.name} is handling ${task.toLowerCase()} with ${quality}% report quality.`
      : `No staff member is assigned to ${task.toLowerCase()}. Manager judgement required.`,
    recommendations: createTaskRecommendations(task, assignedStaff, team),
  };
}

function createTaskRecommendations(task: StaffTask, staff: StaffMember | null, team: Team) {
  const recommendationPrefix = staff ? `${staff.name}:` : 'No assigned staff:';
  const tiredCount = team.roster.filter((player) => (player.fatigue ?? 0) >= 65).length;
  const prospects = team.roster.filter((player) => player.potential - player.overall >= 8).length;
  const expiring = team.roster.filter((player) => (player.contract?.yearsRemaining ?? 1) <= 1).length;

  if (task === 'Injury Management') return [`${recommendationPrefix} ${tiredCount} player${tiredCount === 1 ? '' : 's'} need workload monitoring.`];
  if (task === 'Training Plans') return [`${recommendationPrefix} ${prospects} player${prospects === 1 ? '' : 's'} could benefit from development minutes.`];
  if (task === 'Contract Recommendations') return [`${recommendationPrefix} ${expiring} contract${expiring === 1 ? '' : 's'} need review before offseason.`];
  if (task === 'Free Agent Shortlist') return [`${recommendationPrefix} compare market options against wage budget before signing.`];
  if (task === 'Opponent Preview') return [`${recommendationPrefix} review pace, defensive style and rotation before simulating.`];
  return [`${recommendationPrefix} review this area before advancing the season.`];
}

function createOpinionSummary(player: Player, staff: StaffMember, currentAbility: number, potential: number) {
  if (staff.personality === 'Youth Focused' && player.potential - player.overall >= 8) {
    return `${staff.name} believes ${player.name} has room to grow and should be protected with a clear development pathway.`;
  }

  if (staff.personality === 'Win Now' && player.overall >= 76) {
    return `${staff.name} sees ${player.name} as a major win-now contributor.`;
  }

  if (player.injury) {
    return `${staff.name} values ${player.name} at ${currentAbility} ability but flags current injury risk.`;
  }

  return `${staff.name} rates ${player.name} as ${currentAbility} current ability with ${potential} perceived potential.`;
}

function createRecommendedAction(player: Player, staff: StaffMember, currentAbility: number, potential: number) {
  if (player.injury) return 'Protect minutes until medically cleared.';
  if (staff.personality === 'Youth Focused' && potential - currentAbility >= 8) return 'Prioritise development minutes.';
  if (staff.personality === 'Conservative' && (player.fatigue ?? 0) >= 65) return 'Reduce workload this week.';
  if (staff.personality === 'Win Now' && currentAbility >= 76) return 'Keep in core rotation.';
  if ((player.contract?.yearsRemaining ?? 2) <= 1) return 'Review contract situation.';
  return 'Maintain current role and monitor form.';
}

function createRiskFlags(player: Player, staff: StaffMember) {
  const flags: string[] = [];

  if (player.injury) flags.push('Injury risk');
  if ((player.fatigue ?? 0) >= 70) flags.push('High fatigue');
  if ((player.contract?.yearsRemaining ?? 2) <= 1) flags.push('Contract risk');
  if (staff.evaluation < 55) flags.push('Low opinion confidence');
  if (player.form <= 60) flags.push('Cold form');

  return flags;
}

function getBiasForPlayer(player: Player, staff: StaffMember) {
  if (staff.personality === 'Youth Focused' && player.role === 'Prospect') return 3;
  if (staff.personality === 'Win Now' && player.role === 'Starter') return 3;
  if (staff.personality === 'Conservative' && player.injury) return -4;
  if (staff.personality === 'Data Driven' && player.form >= 75) return 2;
  return 0;
}

function getPersonalityPotentialModifier(staff: StaffMember) {
  if (staff.personality === 'Youth Focused') return 4;
  if (staff.personality === 'Win Now') return -2;
  if (staff.personality === 'Conservative') return -1;
  return 0;
}

function weightedScore(primary: number, secondary: number, tertiary: number) {
  return Math.round(primary * 0.55 + secondary * 0.3 + tertiary * 0.15);
}

function clampRating(value: number) {
  return Math.max(25, Math.min(99, Math.round(value)));
}
