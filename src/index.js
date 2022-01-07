import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import './css/index.css';
import './css/animate.min.css';
import './css/flat-ui.css';
import Moment from 'react-moment';
import moment from 'moment/min/moment-with-locales';
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { Provider } from 'react-redux';
import generateStore from './redux/store';

Moment.globalMoment = moment;
Moment.globalLocale = 'es';
const store = generateStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      
    </Provider> 

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();