import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { convertLandArea, calculatePlotTotalCost } from '../src/utils/landAreaConverter.js';

describe('Land Area Converter & Registration Stamp Duty Tests', () => {
  test('should accurately convert between Cents, SqFt, Grounds, and Acres', () => {
    // 1 Acre = 43,560 sqft
    assert.equal(convertLandArea(1, 'acre', 'sqft'), 43560);

    // 100 Cents = 1 Acre
    assert.equal(convertLandArea(100, 'cent', 'acre'), 1);

    // 1 Cent = 435.6 sqft
    assert.equal(convertLandArea(1, 'cent', 'sqft'), 435.6);

    // 1 Ground = 2,400 sqft
    assert.equal(convertLandArea(1, 'ground', 'sqft'), 2400);

    // 1 Sq Yard = 9 sqft
    assert.equal(convertLandArea(100, 'sqyard', 'sqft'), 900);
  });

  test('should calculate plot total cost with 7% stamp duty and 2% registration', () => {
    // 5 Cents plot at ₹500,000 per cent = ₹2,500,000 base
    const cost = calculatePlotTotalCost({
      areaValue: 5,
      areaUnit: 'cent',
      ratePerUnit: 500000,
      stampDutyRate: 0.07,
      registrationFeeRate: 0.02
    });

    assert.equal(cost.basePrice, 2500000);
    // Stamp duty: 2,500,000 * 0.07 = 175,000
    assert.equal(cost.stampDutyAmount, 175000);
    // Registration: 2,500,000 * 0.02 = 50,000
    assert.equal(cost.registrationFeeAmount, 50000);
    // Total = 2,500,000 + 175,000 + 50,000 = 2,725,000
    assert.equal(cost.totalCost, 2725000);
    assert.equal(cost.areaInCents, 5);
    assert.equal(cost.areaInSqFt, 2178); // 5 * 435.6
  });

  test('should reject invalid or negative numbers', () => {
    assert.throws(() => convertLandArea(-5, 'cent', 'sqft'), /cannot be negative/);
    assert.throws(() => convertLandArea(10, 'cent', 'invalid_unit'), /Unsupported unit/);
    assert.throws(() => calculatePlotTotalCost({ areaValue: 0, ratePerUnit: 100 }), /positive numbers/);
  });
});
