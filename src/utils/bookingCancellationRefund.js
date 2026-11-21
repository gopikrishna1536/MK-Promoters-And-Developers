/**
 * Booking Cancellation Forfeiture Penalty & Statutory Refund Scheduler
 */
export class BookingCancellationRefund {
  static calculateRefund(tokenAdvancePaid, cancellationDaysAfterBooking) {
    if (tokenAdvancePaid <= 0) throw new Error('Token paid must be positive');

    let penalty = 0;
    if (cancellationDaysAfterBooking <= 7) {
      penalty = Math.min(tokenAdvancePaid, 5000);
    } else if (cancellationDaysAfterBooking <= 30) {
      penalty = tokenAdvancePaid * 0.10;
    } else {
      penalty = tokenAdvancePaid * 0.25;
    }

    const netRefund = Number((tokenAdvancePaid - penalty).toFixed(2));
    return {
      tokenAdvancePaid,
      cancellationDaysAfterBooking,
      penaltyAmount: Number(penalty.toFixed(2)),
      netRefundAmount: netRefund
    };
  }
}
