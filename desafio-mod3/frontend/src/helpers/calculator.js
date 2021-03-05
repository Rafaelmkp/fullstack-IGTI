export function calcInterestArray(capital, rate, term) {
  let cashFlow = [];

  let amount = capital;
  for (let i = 1; i <= term; i++) {
    const interest = amount * (rate / 100);
    amount = amount + interest;
    const totalRate = amount / capital;
    const totalInterest = amount - capital;
    const profit = amount >= capital;
    cashFlow.push({
      term: i,
      amount,
      interest,
      totalRate,
      totalInterest,
      profit,
    });
  }
  return cashFlow;
}
