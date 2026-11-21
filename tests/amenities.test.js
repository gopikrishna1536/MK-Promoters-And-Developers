import test from 'node:test';
import assert from 'node:assert/strict';
import { AmenitiesContribution } from '../src/utils/amenitiesContribution.js';

test('Amenities Contribution Tests', async (t) => {
  await t.test('should compute base levy plus premium amenities and GST', () => {
    const res = AmenitiesContribution.calculateLevy(1200, 150, ['swimming_pool_access']);
    assert.equal(res.baseLevy, 180000);
    assert.equal(res.premiumSurcharge, 25000);
    assert.equal(res.gst18Percent, 36900);
    assert.equal(res.grandTotal, 241900);
  });
});
