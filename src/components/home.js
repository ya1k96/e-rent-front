import { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Info } from "./info";
import { Navbar } from "./partials/navbar";
import { Renters } from "./renter";

export class Home extends Component {
    render() {
        return (
            <>            
            <Router>
                <Navbar></Navbar>
                <Switch>
                    <Route exact path="/info" component={Info}/>                    
                    <Route exact path="/renters" component={Renters}/>                    
                </Switch>
            </Router>
            </>
        );
    }
}