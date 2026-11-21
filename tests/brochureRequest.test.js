import test from 'node:test';
import assert from 'node:assert/strict';
import { BrochureRequestValidator } from '../src/utils/brochureRequestValidator.js';

test('Brochure Request Validator Tests', async (t) => {
  await t.test('should accept valid applicant with 10-digit Indian mobile and RERA consent', () => {
    const res = BrochureRequestValidator.validateRequest({
      fullName: 'Rahul Sharma',
      phone: '+91 9876543210',
      email: 'rahul@example.com',
      reraConsentAccepted: true
    });
    assert.equal(res.isValid, true);
    assert.equal(res.sanitizedPhone, '9876543210');
  });
});
