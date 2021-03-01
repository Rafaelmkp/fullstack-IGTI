import React, { useEffect, useState } from 'react';
import FormInput from './FormInput';

export default function Form({ onChangeForm }) {
  const [capital, setCapital] = useState();
  const [rate, setRate] = useState();
  const [term, setTerm] = useState();

  //tentar novamente handleFormChange s/ useEffect

  useEffect(() => {
    onChangeForm([capital, rate, term]);
    console.log(`${capital}, ${rate}, ${term}`);
  }, [capital, rate, term, onChangeForm]);

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
            onChange={setCapital}
            // value={capital}
          />
          <FormInput
            placeholder='Taxa de juros'
            id='int-rate'
            min=''
            step='0.1'
            labelDesc='Taxa de juros mensal:'
            onChange={setRate}
            // value={rate}
          />
          <FormInput
            placeholder='Período'
            id='term'
            min='0'
            step='1'
            labelDesc='Período(meses):'
            onChange={setTerm}
            // value={term}
          />
        </div>
      </div>
    </form>
  );
}
