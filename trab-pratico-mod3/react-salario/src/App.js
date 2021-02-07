import './App.css';
import React, { Component } from 'react';
import FullSalary from './Components/Salary/FullSalary';
import SalStats from './Components/Salary/SalStats';
import Bar from './Components/Bar';
import { calculateSalaryFrom } from './Components/Helpers/salary.js';

const COLOR_INSS = '#e67e22';
const COLOR_IRPF = '#c0392b';
const COLOR_NET_SALARY = '#16a085';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      fullSalary: '',
    };
  }

  handleInputChange = (fullSalary) => {
    this.setState({
      fullSalary: fullSalary,
    });
  };

  render() {
    const { fullSalary, stats } = this.state;
    const salaryObject = calculateSalaryFrom(fullSalary);
    const {
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      netSalary,
      percentINSS,
      percentIRPF,
      percentNetSalary,
    } = salaryObject;

    return (
      <div className='container'>
        <h1>React Salário</h1>
        <div className='row'>
          <FullSalary
            currentValue={fullSalary}
            onChange={this.handleInputChange}
          />
        </div>
        <div className='row'>
          <SalStats value={baseINSS} label='Base INSS' />
          <SalStats
            value={discountINSS}
            percentage={percentINSS}
            label='Desconto INSS'
            color={COLOR_INSS}
          />
          <SalStats value={baseIRPF} label='Base IRPF' />
          <SalStats
            value={discountIRPF}
            percentage={percentIRPF}
            label='Desconto IRPF'
            color={COLOR_IRPF}
          />
          <SalStats
            value={netSalary}
            label='Salário Líquido'
            percentage={percentNetSalary}
            color={COLOR_NET_SALARY}
          />
        </div>
        <Bar
          inss={percentINSS}
          irpf={percentIRPF}
          netSalary={percentNetSalary}
        />
      </div>
    );
  }
}
