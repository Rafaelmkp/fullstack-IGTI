//option 1
export function calcInterestArray(capital, rate, term) {
  let cashFlow = [];

  const initialAmount = capital;
  let amount = capital;
  for (let i = 1; i <= term; i++) {
    let interest = amount * (rate / 100);
    amount = amount + interest;
    cashFlow.push({ term: i, amount: amount, interest: interest });
  }
  return cashFlow;
}
