/**
 * Stage-Based Construction Milestone Payment Schedule
 */
export class ConstructionMilestoneTracker {
  static STANDARD_SCHEDULE = [
    { stage: 'Booking Advance', percentage: 10 },
    { stage: 'Foundation & Plinth Completion', percentage: 15 },
    { stage: 'Ground Floor Slab', percentage: 20 },
    { stage: 'First Floor Slab', percentage: 20 },
    { stage: 'Brickwork & Internal Plastering', percentage: 15 },
    { stage: 'Flooring, Painting & Sanitary Fitting', percentage: 15 },
    { stage: 'Handover & Key Delivery', percentage: 5 }
  ];

  static generateSchedule(totalAgreementValue) {
    if (totalAgreementValue <= 0) throw new Error('Agreement value must be positive');

    let runningTotal = 0;
    const installments = ConstructionMilestoneTracker.STANDARD_SCHEDULE.map((m, idx) => {
      const amount = Number((totalAgreementValue * (m.percentage / 100)).toFixed(2));
      runningTotal += amount;
      return {
        milestoneIndex: idx + 1,
        stage: m.stage,
        percentage: m.percentage,
        demandAmount: amount,
        cumulativePaid: Number(runningTotal.toFixed(2))
      };
    });

    return {
      totalAgreementValue,
      installments
    };
  }
}
