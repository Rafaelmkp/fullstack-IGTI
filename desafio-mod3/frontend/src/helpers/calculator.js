export function calcInterestArray(capital, rate, term) {
  let cashFlow = [];

  let amount = capital;
  for (let i = 1; i <= term; i++) {
    let interest = amount * (rate / 100);
    amount = amount + interest;
    let totalRate = amount / capital;
    cashFlow.push({
      term: i,
      amount: amount,
      interest: interest,
      totalRate: totalRate,
    });
  }
  return cashFlow;
}
