import React, {useState, useContext} from 'react';
import Button from "../common/Button/Button";
import Form from "../common/Form/Form";
import TextField from "../common/TextField/TextField";
import {AuthContext} from "../../context/AuthContext";


function LoginForm(props) {
    const {authorizeByEmail} = useContext(AuthContext);
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    return (
        <Form>
            <TextField
                value={values.email}
                onChange={handleChange('email')}
                placeholder={'E-mail'}
            />
            <TextField
                type='password'
                value={values.password}
                onChange={handleChange('password')}
                placeholder={'Пароль'}
            />
            <Button onClick={()=>authorizeByEmail(values)}>Войти</Button>
        </Form>
    )
}

export default LoginForm;