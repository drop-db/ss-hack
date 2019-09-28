import React, {useContext, useEffect} from "react";
import { withRouter } from "react-router";

import ListComponents from '../../../components/common/List/List';
import {ContentContext} from "../../../context/ContentContext";
import ROLES from "../../../const/roles";

import styles from './UsersList.modules.scss';
import {NavLink} from "react-router-dom";

const {List, ListItem} = ListComponents;

function UsersList(props) {
    const {getAllUsers, users} = useContext(ContentContext);
    useEffect(() => {
        getAllUsers();
    }, []);
    let roles = [];
    const path = props.location.pathname;
    const targetUserId = path.match(/\/home\/users\/(.*)/);
    if (targetUserId) {
        return <UserPage users={users} userId={targetUserId[1]}/>
    } else if (path === '/home/requests') {
        roles = [ ROLES.MENTOR, ROLES.CURATOR, ROLES.PSYCHOLOGIST ];
    } else if (path === '/home/users') {
        roles = [ ROLES.CONFIRMED_MENTOR, ROLES.CONFIRMED_PSYCHOLOGIST, ROLES.CONFIRMED_CURATOR, ROLES.ADMIN];
    }

    const renderedList = renderList(users, roles);

    return <List
        className={styles.listContainer}
        component="div"
    >

        <NavLink  to={'/home/users/2'}>user2</NavLink>
        <NavLink  to={'/home/users/3'}>user3</NavLink>
        {renderedList}
    </List>
}

function renderList(users, rolesToRender) {
    return users.map(user => {
        if (!rolesToRender.some((role) => role === user.role)) return null;
        return (
            <>
                <ListItem key={`${user.firstName}`}>
                    <NavLink to={`/home/users/${user.id}`}>{user.firstName + ' ' + user.role}</NavLink>
                </ListItem>
            </>
        )
    })
}

const UserPage = ({userId, users}) => {
    const user = users.filter(target => target.id === userId)[0];
    return <div>
        <h2>{`User #${userId} page`}</h2>
        <p>Name: {user.firstName}</p>
        <p>Last Name : {user.lastName}</p>
    </div>;
};

export default withRouter(UsersList);