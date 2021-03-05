import React from 'react';
import css from './installment.module.css';
import * as formatter from '../helpers/formatters.js';

export default function Installment({ term, amount, rate, interest, profit }) {
  const classGoodValue = 'green-text darken-4';
  const classGoodPercent = 'blue-text darken-4';
  const classBadValue = 'red-text darken-4';
  const classBadPercent = 'deep-orange-text accent-4';

  const classValue = profit ? classGoodValue : classBadValue;
  const classPercent = profit ? classGoodPercent : classBadPercent;

  return (
    <div className='col s6 m3 l2'>
      <div className={css.flexRow}>
        <span style={{ marginRight: '10px' }}>
          <strong>{term}</strong>
        </span>
        <div className={css.flexColumn}>
          <span className={classValue}>
            <strong>{formatter.formatMoney(amount)}</strong>
          </span>

          <span className={classValue}>
            <strong>{formatter.formatMoneyPositiveNegative(interest)}</strong>
          </span>

          <span className={classPercent}>{formatter.formatPercent(rate)}</span>
        </div>
      </div>
    </div>
  );
}
