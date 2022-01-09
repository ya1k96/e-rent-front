import React from 'react';
import ProtectedRoute from './components/utils/ProtectedRoute';
import Dashboard from './components/adminComponents/dashboard';
import Invoices from './components/adminComponents/invoices';
import Renters from './components/adminComponents/renters';
import Invoice from './components/adminComponents/invoice';
import Navbar from './components/partials/navbar';
import NewRenter  from './components/adminComponents/newrenter';
import { LoginForm } from './components/utils/loginForm';
import { HashRouter, Route, Switch } from "react-router-dom";
import { RegisterForm } from './components/utils/registerForm';
import { EditRenterProfile } from './components/adminComponents/editrenterprofile';
import { RenterProfile } from './components/adminComponents/renterprofile';
import { useSelector } from 'react-redux';
// import { getUser } from './services/connect';
// import { Redirect } from 'react-router';

export const App = () => {      
    const {user} = useSelector(store => store.auth);
    return (<>   
            <HashRouter basename='/'>
                {user ? <Navbar name={user.name}></Navbar>: null}
                <Switch>
                    {user ? null: <Route exact path="/" component={LoginForm}/>}                    
                    {user ? null: <Route exact path="/register" component={RegisterForm}/>}                                   
                    <HashRouter basename="/">
                        <Switch>
                            <ProtectedRoute exact path="/" component={Dashboard} role="admin" user={user}></ProtectedRoute>  
                            <ProtectedRoute exact path="/invoices" component={Invoices} role="admin" user={user}></ProtectedRoute>  
                            <ProtectedRoute exact path="/newrenter" component={NewRenter}role="admin" user={user}></ProtectedRoute>  
                            <ProtectedRoute exact path="/renters" component={Renters} role="admin" user={user}></ProtectedRoute>  
                            <ProtectedRoute exact path="/renter/:id" component={RenterProfile} role="admin" user={user}></ProtectedRoute>  
                            <ProtectedRoute exact path="/renter/:id/edit" component={EditRenterProfile} role="admin" user={user}></ProtectedRoute>  
                            <ProtectedRoute exact path="/invoice/:id" component={Invoice} role="admin" user={user}></ProtectedRoute> 
                        </Switch>
                    </HashRouter>                                               
                </Switch>
            </HashRouter>                    
    </>);
}

