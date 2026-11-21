/**
 * Real Estate Lead Qualification & Response SLA Routing Engine.
 */

/**
 * Validates Indian mobile number format (+91 or 10 digits starting with 6,7,8,9).
 */
export function isValidIndianMobile(phone) {
  if (!phone || typeof phone !== 'string') return false;
  const cleaned = phone.replace(/[\s\-\+]/g, '');
  // If starts with 91 and 12 digits, strip 91
  const normalized = (cleaned.startsWith('91') && cleaned.length === 12) ? cleaned.slice(2) : cleaned;
  return /^[6-9]\d{9}$/.test(normalized);
}

/**
 * Scores and classifies an inbound plot inquiry lead.
 */
export function scoreInboundLead(lead) {
  const {
    name,
    phone,
    budgetLakhs = 0,
    timeframe = 'exploring',
    interestedPlotId
  } = lead;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    throw new Error('Lead name is required');
  }

  let score = 0;
  const scoreBreakdown = {};

  // 1. Phone validation
  if (isValidIndianMobile(phone)) {
    score += 25;
    scoreBreakdown.contact = 25;
  } else if (phone && phone.trim().length >= 7) {
    score += 10;
    scoreBreakdown.contact = 10;
  } else {
    scoreBreakdown.contact = 0;
  }

  // 2. Budget readiness
  if (budgetLakhs >= 40) {
    score += 30;
    scoreBreakdown.budget = 30;
  } else if (budgetLakhs >= 20) {
    score += 20;
    scoreBreakdown.budget = 20;
  } else if (budgetLakhs > 0) {
    score += 10;
    scoreBreakdown.budget = 10;
  } else {
    scoreBreakdown.budget = 0;
  }

  // 3. Purchase timeframe
  const tf = timeframe.toLowerCase();
  if (tf.includes('immediate') || tf.includes('this month') || tf.includes('under 30')) {
    score += 30;
    scoreBreakdown.timeline = 30;
  } else if (tf.includes('1-3') || tf.includes('quarter') || tf.includes('soon')) {
    score += 20;
    scoreBreakdown.timeline = 20;
  } else {
    score += 5;
    scoreBreakdown.timeline = 5;
  }

  // 4. Specific Plot Selection
  if (interestedPlotId) {
    score += 15;
    scoreBreakdown.plotIntent = 15;
  } else {
    scoreBreakdown.plotIntent = 0;
  }

  // Tier classification
  let tier = 'COLD';
  let slaMinutes = 1440; // 24 hours
  let agentRole = 'Automated WhatsApp Campaign';

  if (score >= 75) {
    tier = 'HOT';
    slaMinutes = 15; // 15 mins response SLA
    agentRole = 'Senior Sales Executive';
  } else if (score >= 50) {
    tier = 'WARM';
    slaMinutes = 120; // 2 hours response SLA
    agentRole = 'Sales Associate';
  }

  return {
    leadName: name.trim(),
    totalScore: score,
    tier,
    slaResponseDeadlineMinutes: slaMinutes,
    assignedAgentRole: agentRole,
    scoreBreakdown
  };
}
