import React from 'react';
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { UserContext } from "./context/userContext";
import { Dashboard } from './dashboard';
import Invoice from "./invoice";
import Invoices from "./invoices";
import { NewRenter } from './newrenter';
import { Navbar } from "./partials/navbar";
import { Renters } from './renters';
export const Home = () => {
    const {user} = React.useContext(UserContext);

    return (
        user.logged ?
        <>            
        <Router>
            <Navbar name={user.publicUser.name}></Navbar>
            <Switch>
                <Route exact path="/" component={Dashboard}/>                    
                <Route exact path="/invoices" component={Invoices}/>                    
                <Route exact path="/newrenter" component={NewRenter}/>                    
                <Route exact path="/renters" component={Renters}/>                    
                <Route exact path="/invoice/:id" component={Invoice}/>                    
            </Switch>
        </Router>
        </> :
        <Redirect to="/login"></Redirect>
    );
}