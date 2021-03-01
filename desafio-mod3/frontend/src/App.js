import React, { useEffect, useState } from 'react';
import Form from './components/Form';
import InstallmentGroup from './components/InstallmentGroup';

export default function App() {
  const [capital, setCapital] = useState();
  const [rate, setRate] = useState();
  const [term, setTerm] = useState();

  useEffect(() => {
    setCapital(0);
    setRate(0);
    setTerm(0);
  }, []);

  const handleFormChange = (params) => {
    // console.log(parameters);
    console.log(params);
  };

  return (
    <div style={style.flex}>
      <h1>React - Juros Compostos</h1>
      <Form style={style.flexChild} onChangeForm={handleFormChange} />
      <InstallmentGroup
        style={style.flexChild}
        cashFlow={[capital, rate, term]}
      />
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
