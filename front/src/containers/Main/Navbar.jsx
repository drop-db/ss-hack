import React,{useContext} from 'react';
import { NavLink } from "react-router-dom";
import styles from './Navbar.module.scss';
import {AuthContext} from "../../context/AuthContext";

export default function() {
    const {user, logout} = useContext(AuthContext);
    return (<div className={styles.container}>
        <NavLink to="/profile" activeClassName={styles.activeLink}>Profile</NavLink>
        <NavLink to="/login" activeClassName={styles.activeLink}>Login</NavLink>
        <NavLink to="/register" activeClassName={styles.activeLink}>Register</NavLink>
        <button onClick={logout}>Logout</button>
    </div>);
}