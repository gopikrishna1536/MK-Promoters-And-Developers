import test from 'node:test';
import assert from 'node:assert/strict';
import { SolarPaybackEstimator } from '../src/utils/solarPaybackEstimator.js';

test('Solar Payback Estimator Tests', async (t) => {
  await t.test('should calculate 5 kW solar system payback under 6 years', () => {
    const res = SolarPaybackEstimator.evaluateSolar(6000, 500, 8.0);
    assert.equal(res.recommendedCapacityKW, 5);
    assert.equal(res.netInstallationCost, 200000);
    assert.equal(res.paybackPeriodYears, 3.5);
    assert.equal(res.isViable, true);
  });
});
