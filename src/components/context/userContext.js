import React, { createContext } from "react";

export const UserContext = createContext();
export const UserProvider = (props) => {
    let initialUser = {user:null, logged: false}
    const [user, setUser] = React.useState(initialUser);
    
    return(
        <UserContext.Provider value={{user, setUser}}>        
            {props.children}    
        </UserContext.Provider>
    );
}