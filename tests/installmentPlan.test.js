import test from 'node:test';
import assert from 'node:assert/strict';
import { InterestFreeInstallmentPlan } from '../src/utils/interestFreeInstallmentPlan.js';

test('Interest-Free Installment Plan Tests', async (t) => {
  await t.test('should divide ₹1,000,000 balance into 10 exact ₹100,000 payments', () => {
    const res = InterestFreeInstallmentPlan.generateEqualPlan(1250000, 20, 10);
    assert.equal(res.downPayment, 250000);
    assert.equal(res.financedBalance, 1000000);
    assert.equal(res.installments[0].amount, 100000);
  });
});
