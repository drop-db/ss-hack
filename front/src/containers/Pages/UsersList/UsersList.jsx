import React, {useContext, useEffect} from "react";
import { withRouter } from "react-router"

import ListComponents from '../../../components/common/List/List';
import {ContentContext} from "../../../context/ContentContext";
import ROLES from "../../../const/roles";

import styles from './UsersList.modules.scss';

const {List, ListItem} = ListComponents;

function UsersList(props) {
    const {getAllUsers, users} = useContext(ContentContext);

    useEffect(() => {
        getAllUsers();
    }, []);

    let roles = [];
    const path = props.location.pathname;
    if (path === '/home/requests') {
        roles = [ ROLES.MENTOR, ROLES.CURATOR, ROLES.PSYCHOLOGIST ];
    } else if (path === '/home/mentors') {
        roles = [ ROLES.CONFIRMED_MENTOR ];
    } else if (path === '/home/psyhologists') {
        roles = [ ROLES.CONFIRMED_PSYCHOLOGIST ];
    } else if (path === '/home/curators') {
        roles = [ ROLES.CONFIRMED_CURATOR ];
    }

    const renderedList = renderList(users, roles);

    return <List
        className={styles.listContainer}
        component="div"
    >
        {renderedList}
    </List>
}

function renderList(users, rolesToRender) {
    return users.map(user => {
        if (!rolesToRender.some((role) => role === user.role)) return null;
        return (
            <ListItem key={`${user.firstName}`}>
                {user.firstName + ' ' + user.role}
            </ListItem>
        )
    })
}

export default withRouter(UsersList);