import React from 'react';
import Form from './components/Form';
import InstallmentGroup from './components/InstallmentGroup';

export default function App() {
  return (
    <div style={style.flex}>
      <h1>React - Juros Compostos</h1>
      <Form style={style.flexChild} />
      <InstallmentGroup style={style.flexChild} />
    </div>
  );
}

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
