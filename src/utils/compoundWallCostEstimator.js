/**
 * Plot Perimeter Boundary Masonry Wall & Fencing Cost Estimator
 */
export class CompoundWallCostEstimator {
  static estimateWall(lengthFt, widthFt, wallHeightFt = 5, ratePerRunningFt = 1200) {
    const perimeterFt = 2 * (lengthFt + widthFt);
    const baseCost = perimeterFt * ratePerRunningFt;
    const gateCost = 35000;
    const totalCost = baseCost + gateCost;

    return {
      perimeterRunningFeet: perimeterFt,
      wallHeightFt,
      ratePerRunningFt,
      masonryCost: baseCost,
      ironGateCost: gateCost,
      totalEstimatedCost: totalCost
    };
  }
}
