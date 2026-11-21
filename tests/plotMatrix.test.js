import test from 'node:test';
import assert from 'node:assert/strict';
import { PlotMatrix } from '../src/utils/plotMatrix.js';

test('Plot Matrix Valuation Tests', async (t) => {
  await t.test('should calculate East-facing corner plot premium', () => {
    // 30x40 = 1200 sqft @ ₹2000 = ₹2,400,000 base
    // East (+7%) + Corner (+10%) = 1.17x -> ₹2,808,000
    const res = PlotMatrix.calculatePlotPrice(2000, 40, 30, 'east', true, 30);
    assert.equal(res.areaSqFt, 1200);
    assert.equal(res.baseValue, 2400000);
    assert.equal(res.premiumMultiplier, 1.17);
    assert.equal(res.finalValue, 2808000);
  });
});
