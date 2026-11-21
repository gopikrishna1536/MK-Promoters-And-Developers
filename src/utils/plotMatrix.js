/**
 * Layout Plot Orientation & Premium Valuation Engine
 */
export class PlotMatrix {
  static calculatePlotPrice(basePricePerSqFt, lengthFt, widthFt, facingDirection, isCornerPlot = false, roadWidthFt = 30) {
    const areaSqFt = lengthFt * widthFt;
    const baseValue = areaSqFt * basePricePerSqFt;

    let premiumMultiplier = 1.0;
    // North and East facings command higher premium in Indian Vastu traditions
    if (facingDirection.toLowerCase() === 'north') premiumMultiplier += 0.05;
    else if (facingDirection.toLowerCase() === 'east') premiumMultiplier += 0.07;

    if (isCornerPlot) premiumMultiplier += 0.10;
    if (roadWidthFt >= 40) premiumMultiplier += 0.05;

    const finalValue = Number((baseValue * premiumMultiplier).toFixed(2));
    const premiumAmount = Number((finalValue - baseValue).toFixed(2));

    return {
      lengthFt,
      widthFt,
      areaSqFt,
      basePricePerSqFt,
      baseValue,
      facingDirection,
      isCornerPlot,
      premiumMultiplier: Number(premiumMultiplier.toFixed(2)),
      premiumAmount,
      finalValue
    };
  }
}
