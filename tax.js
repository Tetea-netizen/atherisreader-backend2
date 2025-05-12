// Calculate 20% tax
module.exports = function applyTax(amount) {
  const taxed = amount * 0.8;
  return { taxed, tax: amount - taxed };
};