import test from 'node:test';
import assert from 'node:assert/strict';
import { WaterHarvestingCapacity } from '../src/utils/waterHarvestingCapacity.js';

test('Rainwater Harvesting Tests', async (t) => {
  await t.test('should calculate harvestable liters and recharge pit size', () => {
    const res = WaterHarvestingCapacity.calculateHarvestingYield(2000, 1000, 0.8);
    assert.ok(res.annualHarvestableLiters > 100000);
    assert.ok(res.recommendedPitVolumeCubicMeters > 0);
  });
});
