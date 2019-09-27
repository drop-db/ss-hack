import React,{useContext} from 'react';
import {AuthContext} from "../../context/AuthContext";

export default function(props) {
    const {testLogin} = useContext(AuthContext);
    return (
        <div>
            <h2>Login page</h2>
            <button onClick={testLogin}>Login</button>
        </div>
    );
}
