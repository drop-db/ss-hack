import React, {useContext, useState} from 'react';
import styles from "./SideBar.module.scss";
import {ContentContext} from "../../context/ContentContext";
import ROLES from "../../const/roles";


export default function FiltersSideBar() {
    const {users} = useContext(ContentContext);
    const mentorsCount = users.filter(u => u.role === ROLES.CONFIRMED_MENTOR).length;
    const psychologistCount = users.filter(u => u.role === ROLES.CONFIRMED_PSYCHOLOGIST).length;
    const curatorsCount = users.filter(u => u.role === ROLES.CONFIRMED_CURATOR).length;
    const requestsCount = users.filter(u => [ROLES.CURATOR, ROLES.MENTOR, ROLES.PSYCHOLOGIST].includes(u.role)).length;
    return (
        <div className={styles.filterContainer}>
            <div>{`Всего пользователей: ${users.length}`}</div>
            <div>{`Всего кураторов: ${curatorsCount}`}</div>
            <div>{`Всего наставников: ${mentorsCount}`}</div>
            <div>{`Всего психологов: ${psychologistCount}`}</div>
            <div>{`Всего анкет: ${requestsCount}`}</div>
        </div>
        /*
* <>
                        <NavLink to="/home/profile" activeClassName={styles.activeLink}>Профиль</NavLink>
                        <NavLink to="/home/chat" activeClassName={styles.activeLink}>Чаты</NavLink>
                        {isAdmin && (
                            <React.Fragment>
                            <NavLink to='/home/requests' activeClassName={styles.activeLink}>Заявки на регистрацию</NavLink>
                            <NavLink to='/home/mentors' activeClassName={styles.activeLink}>Менторы</NavLink>
                            <NavLink to='/home/curators' activeClassName={styles.activeLink}>Кураторы</NavLink>
                            <NavLink to='/home/psyhologists' activeClassName={styles.activeLink}>Психологи</NavLink>
                            <NavLink to='/home/children' activeClassName={styles.activeLink}>Дети</NavLink>
                            </React.Fragment>
                         )}
                         <Button onClick={logout}>Logout</Button>
                    </>
* */
    )
}