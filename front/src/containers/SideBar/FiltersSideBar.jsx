import React from 'react';
import TextField from "../../components/common/TextField/TextField";
import Button from "../../components/common/Button/Button";
import styles from "./SideBar.module.scss";

export default function FiltersSideBar(){
    return (
        <div className={styles.filterContainer}>
            <TextField placeholder={'Name'} fullWidth/>
            <TextField placeholder={'Age'} fullWidth/>
            <Button>Search!</Button>
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