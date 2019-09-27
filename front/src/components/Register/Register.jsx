import React, {useContext, useState} from 'react';
import Button from "../common/Button/Button";
import Form from "../common/Form/Form";
import TextField from "../common/TextField/TextField";
import { makeStyles } from '@material-ui/core/styles';
import {AuthContext} from "../../context/AuthContext";

const currencies = [
    {
        value: 'curator',
        label: 'Куратора',
    },
    {
        value: 'mentor',
        label: 'Наставника',
    },
    {
        value: 'psychologist',
        label: 'Психолога',
    }
];

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
    },
}));

function RegisterForm(props) {
    const {registerUser} = useContext(AuthContext);
    const classes = useStyles();
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };
    const [values, setValues] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        secondName: '',
        age: '',
        education: '',
        extraInfo:'',
        role: 'mentor'
    });

    return (
        <Form>
            <TextField
                value={values.email}
                onChange={handleChange('email')}
                placeholder={'E-mail'}
            />
            <TextField
                value={values.password}
                onChange={handleChange('password')}
                type='password'
                placeholder={'Пароль'}
            />
            <TextField
                value={values.confirmPassword}
                onChange={handleChange('confirmPassword')}
                type='password'
                placeholder={'Подтвердите пароль'}
            />
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
                type='number' placeholder={'Возраст'}/>
            <TextField placeholder={'Образование'}/>
            <TextField
                label="О себе"
                placeholder="Увлекаюсь кемпингом"
                multiline
                className={classes.extraInfo}
                margin="normal"
            />
            <TextField
                id="standard-select-currency-native"
                select
                label="Мне интересна роль"
                className={classes.textField}
                value={values.currency}
                onChange={handleChange('role')}
                SelectProps={{
                    native: true,
                    MenuProps: {
                        className: classes.menu,
                    },
                }}
                helperText="Выберете роль"
                margin="normal"
            >
                {currencies.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </TextField>
            <Button onClick={()=>registerUser(values)}>
                Регистрация
            </Button>
        </Form>
    )
}

export default RegisterForm;