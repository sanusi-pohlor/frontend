import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // นำเข้าไฟล์ CSS ที่มีการกำหนด font-family
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
