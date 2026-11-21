import test from 'node:test';
import assert from 'node:assert/strict';
import { CompoundWallCostEstimator } from '../src/utils/compoundWallCostEstimator.js';

test('Compound Wall Cost Estimator Tests', async (t) => {
  await t.test('should estimate boundary wall for 40x30 plot (140 ft perimeter)', () => {
    const res = CompoundWallCostEstimator.estimateWall(40, 30, 5, 1200);
    assert.equal(res.perimeterRunningFeet, 140);
    assert.equal(res.masonryCost, 168000);
    assert.equal(res.totalEstimatedCost, 203000);
  });
});
