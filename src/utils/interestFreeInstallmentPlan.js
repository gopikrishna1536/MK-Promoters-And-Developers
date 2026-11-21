/**
 * Zero-Interest Equal Construction Installment Disbursement Plan
 */
export class InterestFreeInstallmentPlan {
  static generateEqualPlan(totalAmount, downPaymentPercent, numberOfInstallments) {
    if (totalAmount <= 0 || numberOfInstallments <= 0) {
      throw new Error('Invalid plan parameters');
    }

    const downPayment = Number((totalAmount * (downPaymentPercent / 100)).toFixed(2));
    const balance = totalAmount - downPayment;
    const monthlyInstallment = Number((balance / numberOfInstallments).toFixed(2));

    const installments = [];
    let allocated = 0;
    for (let i = 1; i <= numberOfInstallments; i++) {
      let amt = monthlyInstallment;
      if (i === numberOfInstallments) {
        amt = Number((balance - allocated).toFixed(2));
      }
      allocated += amt;
      installments.push({
        installmentNumber: i,
        amount: amt
      });
    }

    return {
      totalAmount,
      downPayment,
      financedBalance: balance,
      numberOfInstallments,
      monthlyInstallment,
      installments
    };
  }
}
