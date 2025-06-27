import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/font+theme.css';
import Frontpage from './FrontPage.js';
import reportWebVitals from './reportWebVitals';
import './fonts/fonts1.css';
import './fonts/epilogue.css';

const root = ReactDOM.createRoot(document.getElementById('Efe Ozalps Portfolio lol'));
root.render(
  <React.StrictMode>
    <Frontpage  />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
