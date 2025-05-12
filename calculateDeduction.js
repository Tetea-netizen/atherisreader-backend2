// Calculate how many coins are deducted for desired payout
module.exports = function calculateDeduction(amountInINR, coinRate) {
  const taxed = amountInINR / 0.8; // apply 20% tax
  const coinsNeeded = taxed * coinRate;
  return { taxedAmount: taxed.toFixed(2), totalCoins: Math.ceil(coinsNeeded), tax: taxed - amountInINR };
};