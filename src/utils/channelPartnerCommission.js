/**
 * Real Estate Channel Partner (Broker) Commission Slab Engine
 */
export class ChannelPartnerCommission {
  static calculateBrokerPayout(totalBookingsValue, quarterlyBookingCount) {
    let slabRate = 2.0;
    if (quarterlyBookingCount >= 10) slabRate = 3.5;
    else if (quarterlyBookingCount >= 5) slabRate = 2.75;

    const commission = Number((totalBookingsValue * (slabRate / 100)).toFixed(2));
    const tds194H = Number((commission * 0.05).toFixed(2));
    const netPayout = Number((commission - tds194H).toFixed(2));

    return {
      totalBookingsValue,
      quarterlyBookingCount,
      slabRatePercent: slabRate,
      grossCommission: commission,
      tdsWithheld: tds194H,
      netPayout
    };
  }
}
