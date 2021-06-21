import React from 'react';
import { Home } from './components/home';
import { LoginForm } from './components/utils/loginForm';
import { UserProvider } from './components/context/userContext';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export const App = () => {      

    return (<>
    <UserProvider>      
      <Router>
          <Switch>
              <Route exact path="/login" component={LoginForm}/>                    
              <Route exact path="/" component={Home}/>                    
                    
          </Switch>
      </Router>
    </UserProvider>
    </>);
    // return (
    //     user.logged ? <Home></Home> : <Redirect to="/login"></Redirect>
    // );
}

