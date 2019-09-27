import React,{useContext} from 'react';
import RegisterForm from "../../components/Register/Register";
import {AuthContext} from "../../context/AuthContext";

export default function(props) {
    const {checkEmailAfterRegistration} = useContext(AuthContext);

    return (
        <div>
            <h2>Register page</h2>
            {
                checkEmailAfterRegistration
                    ? <h2>Вы зарегестрированы. Проверьте почту</h2>
                    : <RegisterForm/>
            }
        </div>
    );
}
