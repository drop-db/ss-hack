import React, {useContext} from 'react';
import {AuthContext} from "../../context/AuthContext";

import styles from './SideBar.module.scss';
import {NavLink} from "react-router-dom";
import Button from "../../components/common/Button/Button";

export default function(props) {
    const {user, logout} = useContext(AuthContext);
    return (
        <div className={styles.sideBar}>
            <NavLink to="/home/profile" activeClassName={styles.activeLink}>Profile</NavLink>
            <NavLink to="/home/chat" activeClassName={styles.activeLink}>Chat</NavLink>
            <Button onClick={logout}>Logout</Button>
        </div>
    );
}
