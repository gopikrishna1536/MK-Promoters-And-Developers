/**
 * Indian Real Estate Land Measurement & Stamp Duty Calculation Engine.
 * Supports Sq.Ft, Sq.Yards, Cents, Ankanams, Grounds, and Acres with government stamp duty estimation.
 */

// Base conversion rates to Square Feet
export const SQFT_PER_UNIT = {
  sqft: 1.0,
  sqyard: 9.0, // 1 sq yard = 9 sq.ft
  cent: 435.6, // 1 cent = 435.6 sq.ft
  ankanam: 72.0, // 1 ankanam = 72 sq.ft (standard in AP/Rayalaseema)
  ground: 2400.0, // 1 ground = 2,400 sq.ft (standard in TN/Chennai)
  acre: 43560.0 // 1 acre = 100 cents = 43,560 sq.ft
};

/**
 * Converts an area from one measurement unit to another.
 */
export function convertLandArea(value, fromUnit, toUnit) {
  if (value < 0) throw new Error('Land area cannot be negative');
  const fromFactor = SQFT_PER_UNIT[fromUnit.toLowerCase()];
  const toFactor = SQFT_PER_UNIT[toUnit.toLowerCase()];

  if (!fromFactor || !toFactor) {
    throw new Error(`Unsupported unit: ${fromUnit} or ${toUnit}`);
  }

  const sqft = value * fromFactor;
  const converted = sqft / toFactor;
  return Math.round(converted * 1000) / 1000;
}

/**
 * Calculates total plot financial cost including government stamp duty and registration fees.
 */
export function calculatePlotTotalCost(options) {
  const {
    areaValue,
    areaUnit = 'sqft',
    ratePerUnit,
    stampDutyRate = 0.07, // 7% standard state stamp duty
    registrationFeeRate = 0.02 // 2% registration fee
  } = options;

  if (areaValue <= 0 || ratePerUnit <= 0) {
    throw new Error('Area value and rate must be positive numbers');
  }

  const basePrice = Math.round(areaValue * ratePerUnit * 100) / 100;
  const stampDutyAmount = Math.round(basePrice * stampDutyRate * 100) / 100;
  const registrationFeeAmount = Math.round(basePrice * registrationFeeRate * 100) / 100;
  const totalCost = Math.round((basePrice + stampDutyAmount + registrationFeeAmount) * 100) / 100;

  // Compute equivalent area in standard Sq.Ft and Cents
  const areaInSqFt = convertLandArea(areaValue, areaUnit, 'sqft');
  const areaInCents = convertLandArea(areaValue, areaUnit, 'cent');

  return {
    basePrice,
    stampDutyAmount,
    registrationFeeAmount,
    totalCost,
    areaInSqFt,
    areaInCents,
    effectiveRatePerSqFt: Math.round((basePrice / areaInSqFt) * 100) / 100
  };
}
