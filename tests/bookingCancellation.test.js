import test from 'node:test';
import assert from 'node:assert/strict';
import { BookingCancellationRefund } from '../src/utils/bookingCancellationRefund.js';

test('Booking Cancellation Refund Tests', async (t) => {
  await t.test('should assess 10% forfeiture on day 15 cancellation', () => {
    const res = BookingCancellationRefund.calculateRefund(100000, 15);
    assert.equal(res.penaltyAmount, 10000);
    assert.equal(res.netRefundAmount, 90000);
  });
});
