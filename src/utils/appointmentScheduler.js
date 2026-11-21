/**
 * Site Visit Appointment Scheduler & Conflict Detector
 */
export class AppointmentScheduler {
  static bookSlot(existingBookings, requestedSlot) {
    const { plotId, requestedStartTime, requestedEndTime } = requestedSlot;
    const reqStart = new Date(requestedStartTime).getTime();
    const reqEnd = new Date(requestedEndTime).getTime();

    if (reqStart >= reqEnd) {
      throw new Error('Start time must precede end time');
    }

    for (const b of existingBookings) {
      if (b.plotId === plotId && b.status !== 'CANCELLED') {
        const bStart = new Date(b.startTime).getTime();
        const bEnd = new Date(b.endTime).getTime();

        // Check overlap: (reqStart < bEnd) && (reqEnd > bStart)
        if (reqStart < bEnd && reqEnd > bStart) {
          return {
            success: false,
            message: `Conflict detected with existing booking ID: ${b.bookingId}`,
            conflictBookingId: b.bookingId
          };
        }
      }
    }

    return {
      success: true,
      message: 'Slot successfully confirmed',
      scheduledPlotId: plotId,
      startTime: requestedStartTime,
      endTime: requestedEndTime
    };
  }
}
