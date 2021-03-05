import React from 'react';
import FormInput from './FormInput';

export default function Form({ data, onChangeForm }) {
  const { capital, intRate, term } = data;

  const handleChangeCapital = ({ target }) => {
    const value = parseFloat(target.value, 10);
    onChangeForm(value, null, null);
  };

  const handleChangeIntRate = ({ target }) => {
    const value = parseFloat(target.value, 10);
    onChangeForm(null, value, null);
  };

  const handleChangeTerm = ({ target }) => {
    const value = parseFloat(target.value, 10);
    onChangeForm(null, null, value);
  };

  return (
    <form className='col s12'>
      <div className='row'>
        <div style={{ display: 'flex' }}>
          <FormInput
            placeholder='Capital inicial'
            id='init-amount'
            min='100'
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
            labelDesc='Período (meses):'
            onChange={handleChangeTerm}
            value={term}
          />
        </div>
      </div>
    </form>
  );
}
