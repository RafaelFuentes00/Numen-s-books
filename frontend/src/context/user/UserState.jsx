import React, { useState, useMemo } from 'react'
import UserContext from "./UserContext";

const UserState = (props) => {

    /*const defaultUser=localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):{
        id: null,
        name: null,
        surnames: null,
        email: null,
        phone: null,
        token: null,
        rol: null,
        language: "en"
    };*/
    const defaultUser = {
        username:null,
        password:null
    }
    const [user, setUser] = useState(defaultUser);

    const value = useMemo(
        () => ({ user, setUser }),
        [user]
    );

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserState