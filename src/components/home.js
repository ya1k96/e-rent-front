import { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Info } from "./info";
import Invoice from "./invoice";
import Invoices from "./invoices";
import { Navbar } from "./partials/navbar";
import { Renters } from "./renter";

export class Home extends Component {
    render() {
        return (
            <>            
            <Router>
                <Navbar></Navbar>
                <Switch>
                    <Route exact path="/" component={Renters}/>                    
                    <Route exact path="/info" component={Info}/>                    
                    <Route exact path="/invoice" component={Invoices}/>                    
                    <Route exact path="/invoice/:id" component={Invoice}/>                    
                </Switch>
            </Router>
            </>
        );
    }
}