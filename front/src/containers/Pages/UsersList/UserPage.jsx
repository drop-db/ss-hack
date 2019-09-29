import React, {useContext, useState} from 'react';
import {NavLink} from 'react-router-dom';

import Scrollbar from "../../../components/common/Scrollbar/Scrollbar";
import styles from './UserPage.module.scss';
import InputBase from '@material-ui/core/InputBase';
import Button from "../../../components/common/Button/Button";
import {ContentContext} from "../../../context/ContentContext";
import roles from '../../../const/roles'

export default function({userId, users}) {
    const user = users.filter(x => x.id ===userId)[0];
    const { firstName, lastName, secondName, sex,
        birthday, hasCar, hasChildren, isMarried, phone, email, city, livingArea,
        education, experience, post, profession} = user;
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };
    const {approveReport} = useContext(ContentContext);
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

    const statistics = user.role===roles.CONFIRMED_PSYCHOLOGIST
        ? {actions: user.lastActivityClicks}
        : null;


    return (
        <div className={styles.outer}>
            <h2>{firstName+' '+lastName}</h2>
            <Button onClick={()=>approveReport(user.id)} className={styles.approveButton}>Подтвердить отчет</Button>
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
                                type='date'
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
                                value={values.city}
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
                    {statistics && <div>
                        {statistics.actions.map(row => <ActionRow row={row} users={users} />)}
                    </div>}
                </div>
            </Scrollbar>
        </div>
    )
}

const ActionRow = ({row, users}) => {
    const user = users.filter(target => target.id ===row.user)[0];
    const linkLabel = `${user.firstName} ${user.secondName} ${user.lastName}`;
    const date = row.clickedAt.substr(0,10);
    return <div style={{display:'flex'}}>Отчет пользователя <NavLink style={{margin:'0 6px'}} to={`/home/users/${user.id}`}> {linkLabel} </NavLink> был принят {date}</div>;
};
