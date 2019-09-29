import React, {useContext, useState} from 'react';
import {AuthContext} from "../../context/AuthContext";
import Scrollbar from "../../components/common/Scrollbar/Scrollbar";
import styles from './ProfilePage.module.scss';
import InputBase from '@material-ui/core/InputBase';

const cities = [
    {
        value: 'krasnoyarsk',
        label: 'Красноярск',
    },
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


export default function (props) {
    const {
        updateUser, user, user: {
            firstName, lastName, secondName, sex,
            birthday, hasCar, hasChildren, isMarried, phone, email, city, livingArea,
            education, experience, post, profession
        }
    } = useContext(AuthContext);
    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value});
    };

    const [values, setValues] = useState({
        firstName,
        lastName,
        secondName,
        sex,
        birthday,
        hasCar,
        hasChildren,
        isMarried,
        phone,
        email,
        city,
        livingArea,
        education,
        experience,
        post,
        profession
    });
    const userCity = (cities.find(c => c.value === city) || cities[0]).label;

    values.birthday = new Date(values.birthday).toISOString().substr(0, 10);


    return (
        <div className={styles.outer}>
            <h2>Моя анкета</h2>
            <Scrollbar autoHeight autoHeightMin={'90vh'}>
                <div className={styles.container}>
                    <div className={styles.personal}>
                        <div className={styles.left}>Обо мне</div>
                        <div className={styles.center}>
                            <p>Имя</p>
                            <p>Фамилия</p>
                            <p>Отчество</p>
                            <p>Дата рождения</p>
                            <p>Пол</p>
                            <p>Семья</p>
                            <p>Дети</p>
                            <p>Машина</p>
                        </div>
                        <div className={styles.right}>
                            <InputBase
                                className={styles.textField}
                                value={values.firstName}
                                onChange={handleChange('firstName')}
                            />
                            <InputBase
                                className={styles.textField}
                                value={values.lastName}
                                onChange={handleChange('lastName')}
                            />
                            <InputBase
                                className={styles.textField}
                                value={values.secondName}
                                onChange={handleChange('secondName')}
                            />
                            <InputBase
                                className={styles.textField}
                                value={values.birthday}
                                onChange={handleChange('birthday')}
                            />
                            <InputBase
                                value={values.sex ? 'Мужской' : 'Женский'}
                                className={styles.textField}
                                onChange={handleChange('isMarried')}
                            />
                            <InputBase
                                value={values.isMarried ? 'Женат/замужем' : 'Не женат/не замужем'}
                                className={styles.textField}
                                onChange={handleChange('isMarried')}
                            />
                            <InputBase
                                value={values.hasChildren ? 'Есть' : 'Нет'}
                                className={styles.textField}
                                onChange={handleChange('hasChildren')}
                            />
                            <InputBase
                                value={values.hasCar ? 'Есть' : 'Нет'}
                                className={styles.textField}
                                onChange={handleChange('hasCar')}
                            />
                        </div>
                    </div>
                    <div className={styles.personal}>
                    <div className={styles.left}>Контакты</div>
                    <div className={styles.center}>
                        <p>Телефон</p>
                        <p>E-mail</p>
                        <p>Город</p>
                        <p>Район</p>
                    </div>
                    <div className={styles.right}>
                        <InputBase
                            className={styles.textField}
                            value={values.phone}
                            onChange={handleChange('phone')}
                        />
                        <InputBase
                            className={styles.textField}
                            value={values.email}
                            onChange={handleChange('email')}
                        />
                        <InputBase
                            className={styles.textField}
                            value={userCity}
                            onChange={handleChange('city')}
                        />
                        <InputBase
                            className={styles.textField}
                            value={values.livingArea}
                            onChange={handleChange('livingArea')}
                        />
                    </div>
                </div>
                    <div className={styles.personal}>
                        <div className={styles.left}>Работа</div>
                        <div className={styles.center}>
                            <p>Образование</p>
                            <p>Профессия</p>
                            <p>Должность</p>
                            <p>Опыт работы</p>
                        </div>
                        <div className={styles.right}>
                            <InputBase
                                className={styles.textField}
                                value={values.education}
                                onChange={handleChange('education')}
                            />
                            <InputBase
                                className={styles.textField}
                                value={values.profession}
                                onChange={handleChange('profession')}
                            />
                            <InputBase
                                className={styles.textField}
                                value={values.post}
                                onChange={handleChange('post')}
                            />
                            <InputBase
                                className={styles.textField}
                                value={values.experience}
                                onChange={handleChange('experience')}
                            />
                        </div>
                    </div>
                </div>
            </Scrollbar>
        </div>
    )
}

