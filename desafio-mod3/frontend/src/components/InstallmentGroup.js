import React from 'react';
import Installment from './Installment';
import { calcInterestArray as calculator } from '../helpers/calculator.js';

export default function InstallmentGroup({ cashFlow }) {
  const { capital, intRate, term } = cashFlow;

  console.log(`${capital} ${intRate} ${term} installment`);
  const cashData = calculator(capital, intRate, term);
  console.log(cashData);
  return (
    <div>
      {/* each element in cashData is a single installment */}
      {cashData.map(({ amount, interest, term }) => {
        return (
          <Installment
            key={term}
            term={term}
            interest={interest}
            amount={amount}
          />
        );
      })}
    </div>
  );
}
