import test from 'node:test';
import assert from 'node:assert/strict';
import { ConstructionMilestoneTracker } from '../src/utils/constructionMilestoneTracker.js';

test('Construction Milestone Payment Schedule Tests', async (t) => {
  await t.test('should allocate 7 construction installments matching 100% agreement value', () => {
    const res = ConstructionMilestoneTracker.generateSchedule(5000000);
    assert.equal(res.installments.length, 7);
    assert.equal(res.installments[0].demandAmount, 500000);
    assert.equal(res.installments[6].cumulativePaid, 5000000);
  });
});
