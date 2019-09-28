import React, {useContext, useState} from 'react';
import Button from "../common/Button/Button";
import Form from "../common/Form/Form";
import TextField from "../common/TextField/TextField";
import Scrollbar from "../common/Scrollbar/Scrollbar";
import {ContentContext} from "../../context/ContentContext";

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
const housesInCities = {
    'novosibirsk': [
        {
            value: 'houseOneNov',
            label: '#1Irk',
        },
        {
            value: 'houseTwoNov',
            label: '#2Irk',
        }
    ],
    'irkutsk': [
        {
            value: 'houseOneIrk',
            label: '#1Nov',
        },
        {
            value: 'houseTwoIrk',
            label: '#2Nov',
        },
        {
            value: 'houseThreeIrk',
            label: '#3Nov',
        }
    ],
    'ufa': [
        {
            value: 'houseOneUfa',
            label: '#1Ufa',
        },
        {
            value: 'houseTwoUfa',
            label: '#2Ufa',
        },
    ],
    'perm': [
        {
            value: 'houseOnePerm',
            label: '#1P',
        },
        {
            value: 'houseTwoLPerm',
            label: '#2T',
        },
        {
            value: 'houseThreeLPerm',
            label: '#3T',
        },
        {
            value: 'houseFourTPerm',
            label: '#4T',
        },
    ],
    'tomsk': [
        {
            value: 'houseOneTomsk',
            label: '#1Tomsk',
        },
        {
            value: 'houseTwoTomsk',
            label: '#2Tomsk',
        },
    ],
    'n_novgorod': [
        {
            value: 'houseOneNN',
            label: '#1NN',
        },
        {
            value: 'houseTwoNN',
            label: '#2NN',
        },
    ]
};

function RegisterChildForm(props) {
    const {registerChild} = useContext(ContentContext);
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };
    const city = 'ufa';
    const houses = housesInCities[city];

    const [values, setValues] = useState({
        sex: true,
        firstName: '',
        lastName: '',
        secondName: '',
        birthday: '',
        childHouse: houses[0].value,
        about: ''
    });

    return (
        <Form>
            <Scrollbar autoHeight autoHeightMin='80vh' >
                <TextField
                    value={values.firstName}
                    onChange={handleChange('firstName')}
                    placeholder={'Имя'}
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
                    select
                    value={values.childHouse}
                    onChange={handleChange('childHouse')}
                    placeholder={'Детский дом'}
                    fullWidth
                    SelectProps={{native: true}}
                >
                    {houses.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </TextField>
                <TextField
                    select
                    label="Пол"
                    value={values.sex}
                    onChange={handleChange('sex')}
                    SelectProps={{native: true}}
                    fullWidth
                >
                    {sexOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </TextField>
                <TextField
                    label="О ребенке"
                    placeholder="Информация о ребенке"
                    multiline
                    fullWidth
                    value={values.about}
                    onChange={handleChange('about')}
                />
                <Button onClick={() => registerChild(values)}>
                    Регистрация
                </Button>
            </Scrollbar>
        </Form>
    )
}

export default RegisterChildForm;