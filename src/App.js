import { Component } from 'react';
import { Login } from './components/login';
import './css/index.css';
import './css/animate.min.css';
import './css/flat-ui.css';

import { Home } from './components/home';

export class App extends Component {
  state = {
    login: true,
    user: null
  }
  
  render() {
    return (
      this.state.login ?  
      <Home></Home> :
      <Login></Login>
    );
  }
}

