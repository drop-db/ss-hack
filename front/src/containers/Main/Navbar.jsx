import React,{useContext} from 'react';
import { NavLink } from "react-router-dom";
import styles from './Navbar.module.scss';
import {AuthContext} from "../../context/AuthContext";
import Button from "../../components/common/Button/Button";

export default function() {
    const {user, logout} = useContext(AuthContext);
    return (<div className={styles.container}>
        <NavLink to="/profile" activeClassName={styles.activeLink}>Profile</NavLink>
        <NavLink to="/login" activeClassName={styles.activeLink}>Login</NavLink>
        <NavLink to="/register" activeClassName={styles.activeLink}>Register</NavLink>
        <Button onClick={logout}>Logout</Button>
    </div>);
}