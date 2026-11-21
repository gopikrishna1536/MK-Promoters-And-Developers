/**
 * Gated Community Clubhouse & Amenities Levy Distributor
 */
export class AmenitiesContribution {
  static calculateLevy(plotAreaSqFt, baseAmenityRatePerSqFt = 150, premiumAmenitiesSelected = []) {
    const baseLevy = plotAreaSqFt * baseAmenityRatePerSqFt;
    let premiumSurcharge = 0;

    for (const a of premiumAmenitiesSelected) {
      if (a === 'swimming_pool_access') premiumSurcharge += 25000;
      if (a === 'badminton_court_membership') premiumSurcharge += 15000;
      if (a === 'solar_street_lighting_share') premiumSurcharge += 10000;
    }

    const totalLevy = baseLevy + premiumSurcharge;
    const gst18Percent = Number((totalLevy * 0.18).toFixed(2));
    const grandTotal = Number((totalLevy + gst18Percent).toFixed(2));

    return {
      plotAreaSqFt,
      baseAmenityRatePerSqFt,
      baseLevy,
      premiumSurcharge,
      totalLevyBeforeTax: totalLevy,
      gst18Percent,
      grandTotal
    };
  }
}
