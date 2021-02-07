import React, { Component } from 'react';
import { formatMoney } from '../Helpers/formatters.js';

export default class FullSalary extends Component {
  handleChange = (event) => {
    const salary = +event.target.value;

    this.props.onChange(salary);
  };

  render() {
    const { currentvalue } = this.props;
    return (
      <div className='input-field col s12'>
        <input
          autoFocus
          placeholder='Insert salary'
          id='full-salary'
          type='number'
          className='validate'
          value={currentvalue}
          onChange={this.handleChange}
          min='1000'
          step='100'
        />
        <label className='active' htmlFor='full-salary'>
          Full Salary
        </label>
      </div>
    );
  }
}
