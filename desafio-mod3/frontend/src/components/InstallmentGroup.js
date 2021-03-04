import React from 'react';
import Installment from './Installment';
import { calcInterestArray as calculator } from '../helpers/calculator.js';

export default function InstallmentGroup({ cashFlow }) {
  const { capital, intRate, term } = cashFlow;

  console.log(`${capital} ${intRate} ${term} installment`);
  const cashData = calculator(capital, intRate, term);
  // console.log(cashData[0]);
  return (
    <div>
      {/* each element in cashData is a single installment */}
      {cashData.forEach(({ amount, interest, term }) => {
        return (
          <Installment
            key={term}
            style={style.installmBox}
            term={term}
            amount={amount}
          />
        );
      })}
    </div>
  );
}

const style = {
  installmBox: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
  },
};
