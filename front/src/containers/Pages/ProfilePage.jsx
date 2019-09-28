import React, {useContext, useState} from 'react';
import {AuthContext} from "../../context/AuthContext";
import Form from "../../components/common/Form/Form";
import TextField from "../../components/common/TextField/TextField";
import Button from "../../components/common/Button/Button";

export default function(props) {
    const {updateUser, user: { firstName, lastName, secondName}} = useContext(AuthContext);
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const [values, setValues] = useState({
        firstName,
        lastName,
        secondName
    });

    return (
        <div>
            <h2>My profile</h2>
            <Form>
                <TextField
                    value={values.firstName}
                    onChange={handleChange('firstName')}
                    placeholder={'Имя'}
                />
                <TextField
                    value={values.lastName}
                    onChange={handleChange('lastName')}
                    placeholder={'Фамилия'}
                />
                <TextField
                    value={values.secondName}
                    onChange={handleChange('secondName')}
                    placeholder={'Отчество'}
                />
                <Button onClick={() => updateUser(values)}>
                    Обновить
                </Button>
            </Form>
        </div>
    )
}

