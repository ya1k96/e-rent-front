import React from 'react';
import ProtectedRoute from './components/utils/ProtectedRoute';
import Dashboard from './components/adminComponents/dashboard';
import Invoices from './components/adminComponents/invoices';
import Renters from './components/adminComponents/renters';
import Invoice from './components/adminComponents/invoice';
import Navbar from './components/partials/navbar';
import { LoginForm } from './components/utils/loginForm';
import { UserContext } from './components/context/userContext';
import { HashRouter, Route, Switch } from "react-router-dom";
import { RegisterForm } from './components/utils/registerForm';
import { QueryClient, QueryClientProvider } from 'react-query'
import { Home } from './components/clientComponent/Home';
import { NewRenter } from './components/adminComponents/newrenter';
import { EditRenterProfile } from './components/adminComponents/editrenterprofile';
import { RenterProfile } from './components/adminComponents/renterprofile';



const queryClient = new QueryClient();

export const App = () => {      
    const { user } = React.useContext(UserContext);
    return (<>    
        <QueryClientProvider client={queryClient}>
        <HashRouter basename='/'>
            {user.logged ? <Navbar name={user.publicUser.name}></Navbar>: null}
            <Switch>
                {user.logged ? null: <Route exact path="/" component={LoginForm}/>}                    
                {user.logged ? null: <Route exact path="/register" component={RegisterForm}/>}                                   
                <HashRouter basename="/dashboard">
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
                <ProtectedRoute exact path="/home" component={Home} role="client" user={user}></ProtectedRoute>                            
            </Switch>
        </HashRouter>
        </QueryClientProvider>    
    </>);
}

