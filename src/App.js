import { Component } from 'react';
import { Login } from './components/login';
import './css/index.css';
import './css/animate.min.css';
import './css/flat-ui.css';

import { Home } from './components/home';
import { Provider } from 'react-redux';

export class App extends Component {
  state = {
    login: false,
    user: null
  }    

  render() {
    return (       
      <Provider>
        {
          this.state.login ? <Home></Home> : <Login></Login>
        }

      </Provider>
    );
  }
}

