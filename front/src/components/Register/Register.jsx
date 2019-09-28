import React, {useContext, useState} from 'react';
import Button from "../common/Button/Button";
import Form from "../common/Form/Form";
import TextField from "../common/TextField/TextField";
import { makeStyles } from '@material-ui/core/styles';
import {AuthContext} from "../../context/AuthContext";
import Checkbox from "../common/Checkbox/Checkbox";
import Label from "../common/Form/Label";
import Scrollbar from "../common/Scrollbar/Scrollbar";

const roles = [
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


const cities = [
    {
        value: 'novosibirsk',
        label: 'Новосибирск',
    },
    {
        value: 'irkutsk',
        label: 'Иркутск',
    },
    {
        value: 'perm',
        label: 'Пермь',
    },
    {
        value: 'ufa',
        label: 'Уфа',
    },
    {
        value: 'tomsk',
        label: 'Томск',
    },
    {
        value: 'n_novgorod',
        label: 'Нижний Новгород',
    },
];

const isMarriedOptions = [
    {
        value: true,
        label: 'Женат(замужем)',
    },
    {
        value: false,
        label: 'Холост(а)',
    },
];

const sexOptions = [
    {
        value: true,
        label: 'Мужской'
    },
    {
        value: false,
        label: 'Женский'
    }
];

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    dense: {
        marginTop: 19,
    },
    fullwidth: {
        width: '100%',
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'center'
    },
    halfWidth: {
        width: '100%',
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'space-around'
    }
}));

function RegisterForm(props) {
    const {registerUser} = useContext(AuthContext);
    const classes = useStyles();
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };
    const [checkboxes, setCheckboxes] = React.useState({
        hasCar: false,
        hasChild: false,
        sendMailing: true
    });

    const handleChangeCheckbox = name => event => {
        setCheckboxes({ ...checkboxes, [name]: event.target.checked });
    };

    const [values, setValues] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        sex: true,
        firstName: '',
        lastName: '',
        secondName: '',
        phone:'',
        isMarried: false,
        birthday: '',
        city: '',
        livingArea: '',
        sendMailing: true,
        profession: '',
        isFullTime: true,
        post: '',
        hobbies: '',
        about: '',
        hasCar: false,
        hasChild: false,
        education: '',
        experience: '',
        role: 'mentor',
    });
    const { hasCar, hasChild, sendMailing } = checkboxes;

    return (
        <Form>
            <Scrollbar autoHeight autoHeightMin='80vh' >
                <TextField
                    value={values.email}
                    onChange={handleChange('email')}
                    placeholder={'E-mail'}
                    fullWidth
                />
                <TextField
                    fullWidth
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
                    fullWidth
                />
                <TextField
                    value={values.firstName}
                    onChange={handleChange('firstName')}
                    placeholder={'Имя'}
                    fullWidth
                />
                <TextField
                    value={values.phone}
                    onChange={handleChange('phone')}
                    placeholder={'Телефон'}
                    fullWidth
                />
                <TextField
                    value={values.lastName}
                    onChange={handleChange('lastName')}
                    placeholder={'Фамилия'}
                    fullWidth
                />
                <TextField
                    value={values.secondName}
                    onChange={handleChange('secondName')}
                    placeholder={'Отчество'}
                    fullWidth
                />
                <TextField
                    type='date'
                    placeholder={'День рождения'}
                    onChange={handleChange('birthday')}
                    value={values.birthday}
                    fullWidth
                />
                <TextField
                    value={values.education}
                    onChange={handleChange('education')}
                    placeholder={'Образование'}
                    fullWidth
                />
                <TextField
                    value={values.profession}
                    onChange={handleChange('profession')}
                    placeholder={'Профессия'}
                    fullWidth
                />
                <TextField
                    value={values.post}
                    onChange={handleChange('post')}
                    placeholder={'Должность'}
                    fullWidth
                />
                <TextField
                    value={values.livingArea}
                    onChange={handleChange('livingArea')}
                    placeholder={'Район проживания'}
                    fullWidth
                />
                <TextField
                    value={values.experience}
                    onChange={handleChange('experience')}
                    placeholder={'Опыт работы с детьми'}
                    fullWidth
                />
                <TextField
                    value={values.hobbies}
                    onChange={handleChange('hobbies')}
                    placeholder={'Хобби (через запятую)'}
                    fullWidth
                />
                <TextField
                    select
                    label="Мой город"
                    value={values.city}
                    onChange={handleChange('city')}
                    SelectProps={{
                        native: true,
                        MenuProps: {className: classes.menu,},
                    }}
                    fullWidth
                >
                    {cities.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </TextField>
                <TextField
                    select
                    label="Мне интересна роль"
                    value={values.role}
                    onChange={handleChange('role')}
                    SelectProps={{
                        native: true,
                        MenuProps: {className: classes.menu},
                    }}
                    fullWidth
                >
                    {roles.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </TextField>
                <TextField
                    select
                    label="Семейное положение"
                    value={values.isMarried}
                    onChange={handleChange('isMarried')}
                    SelectProps={{
                        native: true,
                        MenuProps: {className: classes.menu},
                    }}
                    fullWidth
                >
                    {isMarriedOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                    fullWidth
                </TextField>
                <TextField
                    select
                    label="Пол"
                    value={values.sex}
                    onChange={handleChange('sex')}
                    SelectProps={{
                        native: true,
                        MenuProps: {className: classes.menu},
                    }}
                    fullWidth
                >
                    {sexOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                    fullWidth
                </TextField>
                <TextField
                    label="О себе"
                    placeholder="Расскажите немного о себе"
                    multiline
                    fullWidth
                    value={values.about}
                    onChange={handleChange('about')}
                />

                <div className={classes.halfWidth}>
                    <Label
                        control={<Checkbox checked={hasCar} onChange={handleChangeCheckbox('hasCar')} value="hasCar" />}
                        label="Есть машина"
                    />
                    <Label
                        control={<Checkbox checked={hasChild} onChange={handleChangeCheckbox('hasChild')} value="hasChild" />}
                        label="Есть дети"
                    />
                </div>
                <Label
                    control={<Checkbox checked={sendMailing} onChange={handleChangeCheckbox('sendMailing')} value="sendMailing" />}
                    className={classes.fullwidth}
                    label="Получать уведомления по почте"
                />
                <Button onClick={() => registerUser({...values, ...checkboxes})}>
                    Регистрация
                </Button>
            </Scrollbar>
        </Form>
    )
}

export default RegisterForm;