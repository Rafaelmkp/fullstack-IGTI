import React from 'react';

export default function Installment({ term, interest, amount }) {
  console.log(`${amount} ${interest} ${term} unit`);
  return (
    <div>
      <span style={style.installmBox}>
        {term} - {interest} - {amount}
      </span>
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
