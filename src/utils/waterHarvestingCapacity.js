/**
 * Rooftop Rainwater Harvesting (RWH) Catchment & Recharge Pit Sizing
 */
export class WaterHarvestingCapacity {
  static calculateHarvestingYield(roofAreaSqFt, annualRainfallMm = 1200, runoffCoefficient = 0.85) {
    const roofAreaSqm = roofAreaSqFt * 0.092903;
    const totalYieldLiters = Math.round(roofAreaSqm * annualRainfallMm * runoffCoefficient);
    const pitVolumeCubicMeters = Number(((totalYieldLiters * 0.05) / 1000).toFixed(2));

    return {
      roofAreaSqFt,
      annualRainfallMm,
      runoffCoefficient,
      annualHarvestableLiters: totalYieldLiters,
      recommendedPitVolumeCubicMeters: pitVolumeCubicMeters
    };
  }
}
