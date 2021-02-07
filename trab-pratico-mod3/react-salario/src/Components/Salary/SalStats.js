import React, { Component } from 'react';
import { formatMoney, formatPercentage } from '../Helpers/formatters.js';

export default class SalStats extends Component {
  render() {
    const { color = 'black', value, percentage = 0, label } = this.props;

    const formattedPercentage =
      percentage > 0 ? `(${formatPercentage(percentage)})` : '';
    const formattedValue = `${formatMoney(value)} ${formattedPercentage}`;

    return (
      <div className='input-field col s12 m6 l3'>
        <input
          id={label}
          type='text'
          value={formattedValue}
          readOnly
          style={{ color, fontWeight: 'bold' }}
        />
        <label className='active' htmlFor={label}>
          {label}
        </label>
      </div>
    );
  }
}
