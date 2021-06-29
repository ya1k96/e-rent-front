import React from 'react'
import { HashRouter as Route, Redirect} from "react-router-dom";

function ProtectedRoute(props) {
    const {component: Component, match, user, role, ...rest} = props;
    if(!user.logged || user.publicUser.role !== role){ 
        return <Redirect to="/"></Redirect>;
    }

    return (
        <Route {...rest} ><Component match={match} {...rest}></Component></Route>
    )
}

export default ProtectedRoute
