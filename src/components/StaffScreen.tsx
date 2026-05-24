import {
  calculateStaffBudget,
  calculateUsedStaffBudget,
  canHireStaffMember,
  createDelegatedStaffReport,
  createStaffOpinion,
  getStaffTaskQuality,
  starterStaffPool,
  type StaffMember,
  type StaffTask,
} from '../game/staffManagement';
import type { Team } from '../types/basketball';

type StaffScreenProps = {
  team: Team;
  staff?: StaffMember[];
};

const defaultDelegationTasks: StaffTask[] = [
  'Rotation Advice',
  'Player Evaluation',
  'Training Plans',
  'Injury Management',
  'Contract Recommendations',
  'Opponent Preview',
];

export function StaffScreen({ team, staff = starterStaffPool }: StaffScreenProps) {
  const budget = calculateStaffBudget(team);
  const usedBudget = calculateUsedStaffBudget(staff);
  const budgetRemaining = Math.max(0, budget.annualBudget - usedBudget);
  const staffSlotsRemaining = Math.max(0, budget.maxStaffSlots - staff.length);
  const leadPlayer = [...team.roster].sort((a, b) => b.overall - a.overall)[0];
  const developmentPlayer = [...team.roster].sort((a, b) => b.potential - b.overall - (a.potential - a.overall))[0];
  const staffOpinions = leadPlayer ? staff.slice(0, 3).map((member) => createStaffOpinion(leadPlayer, member)) : [];
  const developmentOpinions = developmentPlayer ? staff.slice(0, 2).map((member) => createStaffOpinion(developmentPlayer, member)) : [];
  const delegatedReports = defaultDelegationTasks.map((task) => createDelegatedStaffReport(task, staff, team));
  const hirePreview = starterStaffPool.map((candidate) => ({ candidate, hireCheck: canHireStaffMember(staff, candidate, budget) }));

  return (
    <section className="staff-screen">
      <div className="screen-heading">
        <div>
          <p className="eyebrow">Club Staff</p>
          <h3>{team.name} backroom team</h3>
          <p className="muted">Hire specialists, delegate jobs and decide whose advice you trust.</p>
        </div>
        <span className="chip">{staff.length}/{budget.maxStaffSlots} staff slots</span>
      </div>

      <section className="roster-summary-grid">
        <SummaryCard label="Staff Budget" value={`£${budget.annualBudget.toLocaleString()}`} helper="Annual board allowance" />
        <SummaryCard label="Used Budget" value={`£${usedBudget.toLocaleString()}`} helper={`£${budgetRemaining.toLocaleString()} remaining`} />
        <SummaryCard label="Open Slots" value={staffSlotsRemaining.toString()} helper="Hiring capacity" />
        <SummaryCard label="Delegated Tasks" value={delegatedReports.filter((report) => report.assignedStaff).length.toString()} helper="Handled by staff" />
      </section>

      <section className="result-grid">
        <article className="panel staff-panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Delegation Board</p>
              <h3>Who is handling what?</h3>
            </div>
            <span className="chip">Manager workload</span>
          </div>
          <div className="staff-delegation-list">
            {delegatedReports.map((report) => (
              <div className="staff-delegation-row" key={report.task}>
                <div>
                  <strong>{report.task}</strong>
                  <span>{report.summary}</span>
                </div>
                <em>{report.quality}%</em>
              </div>
            ))}
          </div>
        </article>

        <article className="panel staff-panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Staff View</p>
              <h3>Player opinions are biased</h3>
            </div>
            <span className="chip">Trust level matters</span>
          </div>
          <div className="assistant-notes">
            <div className="assistant-note">
              <strong>Opinion quality</strong>
              <span>A staff member with poor evaluation can misread current ability or potential.</span>
            </div>
            <div className="assistant-note">
              <strong>Personality bias</strong>
              <span>Youth-focused staff overvalue prospects. Win-now staff prefer proven starters.</span>
            </div>
            <div className="assistant-note">
              <strong>Budget trade-off</strong>
              <span>Small clubs cannot hire every specialist. Choose what you want to delegate.</span>
            </div>
          </div>
        </article>
      </section>

      <article className="panel staff-panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Current Staff</p>
            <h3>Backroom team</h3>
          </div>
          <span className="chip">£{usedBudget.toLocaleString()} wage cost</span>
        </div>
        <div className="staff-card-grid">
          {staff.map((member) => (
            <StaffCard member={member} key={member.id} />
          ))}
        </div>
      </article>

      <section className="result-grid">
        <article className="panel staff-panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Lead Player Debate</p>
              <h3>{leadPlayer?.name ?? 'No player selected'}</h3>
            </div>
            <span className="chip">Staff opinions</span>
          </div>
          <div className="staff-opinion-list">
            {staffOpinions.map((opinion) => (
              <OpinionCard key={`${opinion.staffId}-${opinion.playerId}`} opinion={opinion} />
            ))}
          </div>
        </article>

        <article className="panel staff-panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Development Debate</p>
              <h3>{developmentPlayer?.name ?? 'No prospect selected'}</h3>
            </div>
            <span className="chip">Pathway planning</span>
          </div>
          <div className="staff-opinion-list">
            {developmentOpinions.map((opinion) => (
              <OpinionCard key={`${opinion.staffId}-${opinion.playerId}`} opinion={opinion} />
            ))}
          </div>
        </article>
      </section>

      <article className="panel staff-panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Hiring Market Preview</p>
            <h3>Can the club afford more help?</h3>
          </div>
          <span className="chip">Budget gate</span>
        </div>
        <div className="staff-hire-grid">
          {hirePreview.map(({ candidate, hireCheck }) => (
            <div className="staff-hire-card" key={candidate.id}>
              <div>
                <strong>{candidate.name}</strong>
                <span>{candidate.role} · £{candidate.salary.toLocaleString()}/yr</span>
              </div>
              <em className={hireCheck.canHire ? 'positive' : 'warning'}>{hireCheck.canHire ? 'Affordable' : 'Blocked'}</em>
              <span className="muted">Remaining after hire: £{hireCheck.remainingBudget.toLocaleString()} · {hireCheck.remainingSlots} slot{hireCheck.remainingSlots === 1 ? '' : 's'}</span>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

function SummaryCard({ label, value, helper }: { label: string; value: string; helper: string }) {
  return (
    <article className="panel roster-summary-card">
      <p className="eyebrow">{label}</p>
      <strong>{value}</strong>
      <span className="muted">{helper}</span>
    </article>
  );
}

function StaffCard({ member }: { member: StaffMember }) {
  const bestTask = [...member.assignedTasks].sort((a, b) => getStaffTaskQuality(member, b) - getStaffTaskQuality(member, a))[0];

  return (
    <div className="staff-card">
      <div className="staff-card-header">
        <div>
          <strong>{member.name}</strong>
          <span>{member.role} · {member.personality}</span>
        </div>
        <em>£{member.salary.toLocaleString()}</em>
      </div>
      <div className="staff-skill-strip">
        <SkillPill label="Eval" value={member.evaluation} />
        <SkillPill label="Dev" value={member.development} />
        <SkillPill label="Tact" value={member.tacticalKnowledge} />
        <SkillPill label="Scout" value={member.scouting} />
      </div>
      <span className="muted">Best task: {bestTask ?? 'Unassigned'}</span>
    </div>
  );
}

function SkillPill({ label, value }: { label: string; value: number }) {
  return (
    <span className="staff-skill-pill">
      {label} <strong>{value}</strong>
    </span>
  );
}

function OpinionCard({ opinion }: { opinion: ReturnType<typeof createStaffOpinion> }) {
  return (
    <div className="staff-opinion-card">
      <div className="staff-opinion-header">
        <strong>{opinion.staffName}</strong>
        <span>{opinion.role} · {opinion.confidence}% confidence</span>
      </div>
      <p>{opinion.summary}</p>
      <span className="muted">Action: {opinion.recommendedAction}</span>
      <div className="staff-skill-strip">
        <SkillPill label="CA" value={opinion.perceivedCurrentAbility} />
        <SkillPill label="PA" value={opinion.perceivedPotential} />
      </div>
      {opinion.riskFlags.length > 0 && <span className="warning">Risks: {opinion.riskFlags.join(' · ')}</span>}
    </div>
  );
}
