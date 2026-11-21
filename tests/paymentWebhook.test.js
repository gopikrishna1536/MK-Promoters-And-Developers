import test from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { PaymentGatewayWebhookVerifier } from '../src/utils/paymentGatewayWebhookVerifier.js';

test('Payment Gateway Webhook Verifier Tests', async (t) => {
  await t.test('should verify authentic payment signature', () => {
    const payload = JSON.stringify({ paymentId: 'PAY-100', amount: 50000 });
    const secret = 'mk_wh_sec_999';
    const sig = crypto.createHmac('sha256', secret).update(payload).digest('hex');

    const isValid = PaymentGatewayWebhookVerifier.verifySignature(payload, sig, secret);
    assert.equal(isValid, true);
  });
});
