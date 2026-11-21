/**
 * Homebuyer Referral Incentive & Commission Tier Engine
 */
export class CustomerReferralBonus {
  static calculateReferralPayout(referredUnitAgreementValue, referralCountByUser) {
    if (referredUnitAgreementValue <= 0) throw new Error('Agreement value must be positive');

    let bonusRate = 0.5;
    if (referralCountByUser >= 4) bonusRate = 1.0;
    else if (referralCountByUser >= 2) bonusRate = 0.75;

    const payout = Number((referredUnitAgreementValue * (bonusRate / 100)).toFixed(2));
    const tdsWithheld = Number((payout * 0.05).toFixed(2));
    const netPayout = Number((payout - tdsWithheld).toFixed(2));

    return {
      referredUnitAgreementValue,
      referralCountByUser,
      appliedBonusPercent: bonusRate,
      grossPayout: payout,
      tdsDeduction5Percent: tdsWithheld,
      netPayableAmount: netPayout
    };
  }
}
