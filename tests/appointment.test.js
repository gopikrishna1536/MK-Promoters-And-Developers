import test from 'node:test';
import assert from 'node:assert/strict';
import { AppointmentScheduler } from '../src/utils/appointmentScheduler.js';

test('Appointment Scheduler Tests', async (t) => {
  await t.test('should book non-conflicting appointment slot', () => {
    const existing = [
      { bookingId: 'BK-1', plotId: 'P-101', startTime: '2026-12-01T10:00:00Z', endTime: '2026-12-01T11:00:00Z', status: 'CONFIRMED' }
    ];
    const res = AppointmentScheduler.bookSlot(existing, {
      plotId: 'P-101',
      requestedStartTime: '2026-12-01T11:30:00Z',
      requestedEndTime: '2026-12-01T12:30:00Z'
    });
    assert.equal(res.success, true);
  });

  await t.test('should reject overlapping slot on same plot', () => {
    const existing = [
      { bookingId: 'BK-1', plotId: 'P-101', startTime: '2026-12-01T10:00:00Z', endTime: '2026-12-01T11:00:00Z', status: 'CONFIRMED' }
    ];
    const res = AppointmentScheduler.bookSlot(existing, {
      plotId: 'P-101',
      requestedStartTime: '2026-12-01T10:30:00Z',
      requestedEndTime: '2026-12-01T11:30:00Z'
    });
    assert.equal(res.success, false);
    assert.equal(res.conflictBookingId, 'BK-1');
  });
});
