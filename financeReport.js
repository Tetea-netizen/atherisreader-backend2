// Platform financial summary calculator
module.exports = function generateFinanceReport(transactions, feeRate = 0.03) {
  let totalTax = 0;
  let totalFees = 0;
  let payoutCount = 0;

  transactions.forEach(tx => {
    if (tx.type === 'platform_tax') {
      totalTax += tx.amount;
    }
    if (tx.type === 'payout') {
      payoutCount++;
      totalFees += tx.amount * feeRate; // Razorpay/PayPal fees
    }
  });

  const netProfit = totalTax - totalFees;
  return {
    totalTax: totalTax.toFixed(2),
    estimatedFees: totalFees.toFixed(2),
    netPlatformProfit: netProfit.toFixed(2),
    payoutCount
  };
};
