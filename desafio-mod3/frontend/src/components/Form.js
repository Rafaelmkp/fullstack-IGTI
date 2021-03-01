import React, { useEffect, useState } from 'react';
import FormInput from './FormInput';

export default function Form({ onChangeForm }) {
  const [capital, setCapital] = useState();
  const [rate, setRate] = useState();
  const [term, setTerm] = useState();

  useEffect(() => {}, []);

  const handleCapitalChange = (value) => {
    setCapital(value);
    onChangeForm([capital, rate, term]);
  };

  const handleRateChange = (value) => {
    setRate(value);
    onChangeForm([capital, rate, term]);
  };

  const handleTermChange = (value) => {
    setTerm(value);
    onChangeForm([capital, rate, term]);
  };

  return (
    <form className='col s12'>
      <div className='row'>
        <div style={{ display: 'flex' }}>
          <FormInput
            placeholder='Capital inicial'
            id='init-amount'
            min='0'
            step='1'
            labelDesc='Capital inicial:'
            onChange={handleCapitalChange}
            value={capital}
          />
          <FormInput
            placeholder='Taxa de juros'
            id='int-rate'
            min=''
            step='0.1'
            labelDesc='Taxa de juros mensal:'
            onChange={handleRateChange}
          />
          <FormInput
            placeholder='Período'
            id='term'
            min='0'
            step='1'
            labelDesc='Período(meses):'
            onChange={handleTermChange}
          />
        </div>
      </div>
    </form>
  );
}
