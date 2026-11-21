import test from 'node:test';
import assert from 'node:assert/strict';
import { ChannelPartnerCommission } from '../src/utils/channelPartnerCommission.js';

test('Channel Partner Commission Tests', async (t) => {
  await t.test('should apply 2.75% slab for broker with 6 bookings', () => {
    const res = ChannelPartnerCommission.calculateBrokerPayout(20000000, 6);
    assert.equal(res.slabRatePercent, 2.75);
    assert.equal(res.grossCommission, 550000);
    assert.equal(res.netPayout, 522500);
  });
});
