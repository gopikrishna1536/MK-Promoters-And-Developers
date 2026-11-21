import test from 'node:test';
import assert from 'node:assert/strict';
import { CustomerReferralBonus } from '../src/utils/customerReferralBonus.js';

test('Customer Referral Bonus Tests', async (t) => {
  await t.test('should calculate tier 2 referral bonus on ₹5,000,000 property', () => {
    const res = CustomerReferralBonus.calculateReferralPayout(5000000, 2);
    assert.equal(res.appliedBonusPercent, 0.75);
    assert.equal(res.grossPayout, 37500);
    assert.equal(res.netPayableAmount, 35625);
  });
});
