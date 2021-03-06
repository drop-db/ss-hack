import React, {useContext, useEffect} from "react";
import {withRouter} from "react-router";
import {ContentContext} from "../../../context/ContentContext";
import ROLES from "../../../const/roles";

import styles from './UsersList.module.scss';
import {NavLink} from "react-router-dom";
import Button from "../../../components/common/Button/Button";

import Scrollbar from "../../../components/common/Scrollbar/Scrollbar";
import {AuthContext} from "../../../context/AuthContext";
import UserPage from './UserPage';
import _ from 'lodash';

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

const eventCreateRoom = 'messages:room'; // userId

function UsersList(props) {
    const {users, addChat} = useContext(ContentContext);
    const {user} = useContext(AuthContext);

    const filteredUsers = users.filter(target => target.id !== user.id);

    let roles = [];
    const path = props.location.pathname;
    const targetUserId = path.match(/\/home\/users\/(.*)/);
    if (targetUserId) {
        return <UserPage users={users} userId={targetUserId[1]}/>
    } else if (path === '/home/requests') {
        roles = [ROLES.MENTOR, ROLES.CURATOR, ROLES.PSYCHOLOGIST];
    } else if (path === '/home/users') {
        roles = [ROLES.CONFIRMED_MENTOR, ROLES.CONFIRMED_PSYCHOLOGIST, ROLES.CONFIRMED_CURATOR, ROLES.ADMIN];
    }

    const handleContact = async function (userId, event) {
        event.stopPropagation();
        event.preventDefault();
        const {chat} = await window.socketHACKATON.send(eventCreateRoom, {userId});
        addChat(chat);
        props.history.push(`/home/chats/${chat.id}`);
    };

    const renderList = (users, rolesToRender, notConfirmed) => {

        const extraColumns = notConfirmed
            ? <>
                <div className={styles.thirdBlock}>
                    <div>{(new Date()).toISOString().substr(0, 10)}</div>
                </div>
            </>
            : null;

        return <Scrollbar autoHeight autoHeightMin='95vh'>
            {users.map(user => {
                if (!rolesToRender.some((role) => role === user.role)) return null;
                const {lastActivityClicks} = user;
                const sortedActivities = _.sortBy(lastActivityClicks, o => o.clickedAt)
                const sortedActivitiesLength = sortedActivities.length;
                const lastActivity = sortedActivitiesLength ? sortedActivities[sortedActivitiesLength - 1].clickedAt : null;
                const dataClicks = {total: sortedActivitiesLength, last: lastActivity};
                const city = (cities.find(c => c.value === user.city) || cities[0]).label;
                return (
                    <NavLink className={styles.navLink} to={`/home/users/${user.id}`}>
                        <div className={styles.userRow}>
                            <div className={styles.firstBlock}>
                                <div className={styles.avatar}/>
                                <div
                                    className={styles.name}>{user.lastName + ' '+  user.firstName + ' ' + (user.secondName ? user.secondName : '' )}</div>
                                <div className={styles.city}>{city}</div>
                            </div>
                            <div className={styles.secondBlock}>
                                <div className={styles.age}>{user.sex ? 'Мужской' : 'Женский'} • 24</div>
                            </div>
                            {notConfirmed
                                ? extraColumns
                                : <>
                                    <div className={styles.thirdBlock}>
                                        <div>{dataClicks.last ? new Date(dataClicks.last).toISOString().substr(0, 10) : '-'}</div>
                                    </div>
                                    <div className={styles.forthBlock}>
                                        <div>{dataClicks.total}</div>
                                    </div>
                                </>
                            }
                            <Button onClick={handleContact.bind(this, user.id)}>Связаться</Button>
                        </div>
                    </NavLink>
                )
            })
            }
        </Scrollbar>
    };

    const renderedList = renderList(filteredUsers, roles, path == '/home/requests');

    return renderedList;
}

export default withRouter(UsersList);
