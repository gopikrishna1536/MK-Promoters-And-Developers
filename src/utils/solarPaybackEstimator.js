/**
 * Rooftop Solar PV System Capacity & Net Metering Payback Estimator
 */
export class SolarPaybackEstimator {
  static evaluateSolar(monthlyElectricityBill, availableRoofSqFt, gridTariffPerKWh = 8.0) {
    const maxKWSolar = Math.floor(availableRoofSqFt / 100);
    const monthlyGenerationKWh = maxKWSolar * 120;
    const monthlySavings = Number((monthlyGenerationKWh * gridTariffPerKWh).toFixed(2));

    const grossCost = maxKWSolar * 50000;
    const subsidy = grossCost * 0.20;
    const netCost = grossCost - subsidy;

    const annualSavings = monthlySavings * 12;
    const paybackYears = annualSavings > 0 ? Number((netCost / annualSavings).toFixed(1)) : 99.0;

    return {
      recommendedCapacityKW: maxKWSolar,
      monthlyGenerationKWh,
      netInstallationCost: netCost,
      annualElectricitySavings: annualSavings,
      paybackPeriodYears: paybackYears,
      isViable: paybackYears <= 6.0
    };
  }
}
