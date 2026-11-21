import test from 'node:test';
import assert from 'node:assert/strict';
import { PropertyHandoverChecklist } from '../src/utils/propertyHandoverChecklist.js';

test('Property Handover Checklist Tests', async (t) => {
  await t.test('should permit handover when no critical snags remain', () => {
    const snags = [
      { id: 'S1', severity: 'MINOR', status: 'OPEN' },
      { id: 'S2', severity: 'CRITICAL', status: 'RESOLVED' }
    ];
    const res = PropertyHandoverChecklist.evaluateHandoverReadiness(snags);
    assert.equal(res.readyForOccupancy, true);
    assert.equal(res.status, 'APPROVED_FOR_KEY_HANDOVER');
  });
});
