import React,{useContext} from 'react';
import {AuthContext} from "../../context/AuthContext";

export default function(props) {
    const {user} = useContext(AuthContext);
    return (
        <div >
            <h2>Profile Page</h2>
            {`Your name is ${user}`}
        </div>
    );
}
