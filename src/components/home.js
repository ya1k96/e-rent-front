import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { UserContext } from "./context/userContext";
import { Info } from "./info";
import Invoice from "./invoice";
import Invoices from "./invoices";
import { Navbar } from "./partials/navbar";
import { Renters } from "./renter";

export const Home = () => {
    const {user, setUser} = React.useContext(UserContext);

    return (
        user.logged ?
        <>            
        <Router>
            <Navbar name={user.publicUser.name}></Navbar>
            <Switch>
                <Route exact path="/" component={Renters}/>                    
                <Route exact path="/info" component={Info}/>                    
                <Route exact path="/invoices" component={Invoices}/>                    
                <Route exact path="/invoice/:id" component={Invoice}/>                    
            </Switch>
        </Router>
        </> :
        <Redirect to="/login"></Redirect>
    );
}