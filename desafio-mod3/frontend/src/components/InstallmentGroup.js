import React from 'react';
import Installment from './Installment';
import { calcInterestArray as calculator } from '../helpers/calculator.js';

export default function InstallmentGroup() {
  return (
    <div>
      <Installment style={style.installmBox} />
    </div>
  );
}

const style = {
  installmBox: {
    padding: '10px',
  },
};
