import crypto from 'node:crypto';

/**
 * Payment Gateway HMAC Signature Webhook Verifier
 */
export class PaymentGatewayWebhookVerifier {
  static verifySignature(rawPayload, receivedSignature, webhookSecret) {
    if (!rawPayload || !receivedSignature || !webhookSecret) return false;

    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(rawPayload)
      .digest('hex');

    return crypto.timingSafeEqual(
      Buffer.from(receivedSignature, 'utf8'),
      Buffer.from(expectedSignature, 'utf8')
    );
  }
}
