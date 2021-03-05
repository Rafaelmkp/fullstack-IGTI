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
      console.log(`${capital}, ${intRate}, ${term} newCap`);
      return;
    }
    if (newIntRate !== null) {
      setIntRate(newIntRate);
      console.log(`${capital}, ${intRate}, ${term} newInt`);
      return;
    }
    setTerm(newTerm);
    console.log(`${capital}, ${intRate}, ${term} newTerm`);
  };

  return (
    <div className='container center'>
      <h1 className='center'>React - Juros Compostos</h1>
      <Form data={{ capital, intRate, term }} onChangeForm={handleFormChange} />
      <InstallmentGroup cashFlow={{ capital, intRate, term }} />
    </div>
  );
}
