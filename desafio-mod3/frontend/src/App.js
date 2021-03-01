import React, { useEffect, useState } from 'react';
import Form from './components/Form';
import InstallmentGroup from './components/InstallmentGroup';

export default function App() {
  const [capital, setCapital] = useState(0);
  const [rate, setRate] = useState(0);
  const [term, setTerm] = useState(0);

  // useEffect(() => {
  //   setCapital(0);
  //   setRate(0);
  //   setTerm(0);
  // }, []);

  // useEffect((params) => {
  //   setCapital(params[0]);
  //   setRate(params[1]);
  //   setTerm(params[2]);
  //   console.log(params);
  // }, []);

  const handleFormChange = (params) => {
    setCapital(params[0]);
    setRate(params[1]);
    setTerm(params[2]);
    // console.log(`${capital}, ${rate}, ${term}`);
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
