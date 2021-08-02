import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import './css/index.css';
import './css/animate.min.css';
import './css/flat-ui.css';
import { UserProvider } from './components/context/userContext';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />

    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals