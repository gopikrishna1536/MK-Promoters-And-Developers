import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { scoreInboundLead, isValidIndianMobile } from '../src/utils/leadScoring.js';

describe('Real Estate Lead Qualification & SLA Tests', () => {
  test('should validate Indian mobile numbers', () => {
    assert.equal(isValidIndianMobile('9876543210'), true);
    assert.equal(isValidIndianMobile('+91 9876543210'), true);
    assert.equal(isValidIndianMobile('919876543210'), true);
    assert.equal(isValidIndianMobile('1234567890'), false); // starts with 1
    assert.equal(isValidIndianMobile('98765'), false); // too short
  });

  test('should classify high-intent buyer as HOT lead with 15-minute SLA', () => {
    const lead = {
      name: 'Ramesh Kumar',
      phone: '9840123456',
      budgetLakhs: 50,
      timeframe: 'immediate purchase',
      interestedPlotId: 'PLOT-EAST-12'
    };

    const result = scoreInboundLead(lead);
    // Contact: 25 + Budget: 30 + Timeline: 30 + Plot: 15 = 100
    assert.equal(result.totalScore, 100);
    assert.equal(result.tier, 'HOT');
    assert.equal(result.slaResponseDeadlineMinutes, 15);
    assert.equal(result.assignedAgentRole, 'Senior Sales Executive');
  });

  test('should classify browsing visitor as COLD lead', () => {
    const lead = {
      name: 'Casual Visitor',
      phone: '111222',
      budgetLakhs: 0,
      timeframe: 'just browsing'
    };

    const result = scoreInboundLead(lead);
    assert.ok(result.totalScore < 50);
    assert.equal(result.tier, 'COLD');
    assert.equal(result.slaResponseDeadlineMinutes, 1440);
  });
});
