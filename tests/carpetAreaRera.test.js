import test from 'node:test';
import assert from 'node:assert/strict';
import { CarpetAreaReraCalculator } from '../src/utils/carpetAreaReraCalculator.js';

test('RERA Carpet Area Calculator Tests', async (t) => {
  await t.test('should calculate carpet area and loading factor accurately', () => {
    const res = CarpetAreaReraCalculator.calculateReraMetrics(800, 100, 100, 1040);
    assert.equal(res.reraCarpetAreaSqFt, 800);
    assert.equal(res.builtUpAreaSqFt, 1000);
    assert.equal(res.loadingFactorPercent, 30.0);
    assert.equal(res.isReraTransparent, true);
  });
});
