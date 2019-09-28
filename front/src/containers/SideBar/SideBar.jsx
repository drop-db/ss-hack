import React, {useContext} from 'react';
import {AuthContext} from "../../context/AuthContext";

import styles from './SideBar.module.scss';
import {NavLink} from "react-router-dom";
import Button from "../../components/common/Button/Button";

import ROLES from '../../const/roles';

export default function(props) {
    const {user, logout} = useContext(AuthContext);

    const isAdmin = user.role === ROLES.ADMIN;
    return (
        <div className={styles.sideBar}>
            <NavLink to="/home/profile" activeClassName={styles.activeLink}>Профиль</NavLink>
            <NavLink to="/home/chat" activeClassName={styles.activeLink}>Чаты</NavLink>
            {isAdmin && (
                <React.Fragment>
                    <NavLink to='/home/requests' activeClassName={styles.activeLink}>Заявки на регистрацию</NavLink>
                    <NavLink to='/home/mentors' activeClassName={styles.activeLink}>Менторы</NavLink>
                    <NavLink to='/home/curators' activeClassName={styles.activeLink}>Кураторы</NavLink>
                    <NavLink to='/home/psyhologists' activeClassName={styles.activeLink}>Психологи</NavLink>
                </React.Fragment>
            )}
            <Button onClick={logout}>Logout</Button>
        </div>
    );
}
