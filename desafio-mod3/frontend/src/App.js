import React, { useState } from 'react';
import Form from './components/Form';
import InstallmentGroup from './components/InstallmentGroup';

export default function App() {
  const [capital, setCapital] = useState(0);
  const [intRate, setIntRate] = useState(0);
  const [term, setTerm] = useState(0);

  const handleFormChange = (newCap, newIntRate, newTerm) => {
    if (newCap !== null) {
      setCapital(newCap);
      return;
    }
    if (newIntRate !== null) {
      setIntRate(newIntRate);
      return;
    }
    setTerm(newTerm);
  };

  return (
    <div style={style.flex}>
      <h1>React - Juros Compostos</h1>
      <Form style={style.flexChild} onChangeForm={handleFormChange} />
      <InstallmentGroup
        style={style.flexChild}
        cashFlow={(capital, intRate, term)}
      />
    </div>
  );
}

/**
 * >>STYLE<<
 */
const style = {
  flex: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'column',
    margin: '15px',
  },

  flexChild: {
    padding: '10px',
  },
};
