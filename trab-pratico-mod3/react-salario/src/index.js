import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
