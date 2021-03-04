import React from 'react';
import FormInput from './FormInput';

export default function Form({ data, onChangeForm }) {
  const { capital, intRate, term } = data;

  const handleChangeCapital = ({ target }) => {};

  const handleChangeIntRate = ({ target }) => {};

  const handleChangeTerm = ({ target }) => {};
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
            onChange={handleChangeCapital}
            value={capital}
          />
          <FormInput
            placeholder='Taxa de juros'
            id='int-rate'
            min=''
            step='0.1'
            labelDesc='Taxa de juros mensal:'
            onChange={handleChangeIntRate}
            value={intRate}
          />
          <FormInput
            placeholder='Período'
            id='term'
            min='0'
            step='1'
            labelDesc='Período(meses):'
            onChange={handleChangeTerm}
            value={term}
          />
        </div>
      </div>
    </form>
  );
}
