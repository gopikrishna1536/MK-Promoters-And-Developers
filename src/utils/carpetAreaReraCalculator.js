/**
 * Real Estate (Regulation and Development) Act (RERA) Carpet Area Calculator
 */
export class CarpetAreaReraCalculator {
  static calculateReraMetrics(internalWallToWallSqFt, balconySqFt, externalWallSqFt, superBuiltUpSqFt) {
    const reraCarpetArea = internalWallToWallSqFt;
    const builtUpArea = reraCarpetArea + balconySqFt + externalWallSqFt;

    const commonAreaShare = Math.max(0, superBuiltUpSqFt - builtUpArea);
    const loadingFactorPercent = reraCarpetArea > 0
      ? Number((((superBuiltUpSqFt - reraCarpetArea) / reraCarpetArea) * 100).toFixed(1))
      : 0;

    return {
      reraCarpetAreaSqFt: reraCarpetArea,
      balconySqFt,
      builtUpAreaSqFt: builtUpArea,
      superBuiltUpSqFt,
      commonAreaShareSqFt: commonAreaShare,
      loadingFactorPercent,
      isReraTransparent: loadingFactorPercent <= 30.0
    };
  }
}
