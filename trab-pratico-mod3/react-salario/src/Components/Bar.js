import React, { Component } from 'react';
import css from './bar.module.css';

export default class Bar extends Component {
  render() {
    const {
      inss,
      irpf,
      netSalary,
      colorINSS = '#e67e22',
      colorIRPF = '#c0392b',
      colorNetSalary = '#16a085',
    } = this.props;
    console.log(this.props);

    return (
      <div className={css.flexContainer}>
        <div
          // className={css.bar}
          style={{
            backgroundColor: colorINSS,
            width: inss + '%',
            height: '20px',
          }}
        ></div>
        <div
          className={css.bar}
          style={{ backgroundColor: colorIRPF, width: irpf + '%' }}
        ></div>
        <div
          className={css.bar}
          style={{
            backgroundColor: colorNetSalary,
            width: netSalary + '%',
          }}
        ></div>
      </div>
    );
  }
}
