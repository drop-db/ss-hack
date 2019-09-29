import React, {useContext, useEffect} from "react";
import { withRouter } from "react-router";
import {ContentContext} from "../../../context/ContentContext";
import ROLES from "../../../const/roles";

import styles from './UsersList.module.scss';
import {NavLink} from "react-router-dom";
import Button from "../../../components/common/Button/Button";

import Scrollbar from "../../../components/common/Scrollbar/Scrollbar";
import {AuthContext} from "../../../context/AuthContext";
import UserPage from './UserPage';

const eventCreateRoom = 'messages:room'; // userId

function UsersList(props) {
    const {users} = useContext(ContentContext);
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

    const handleContact = async function (userId) {
        const { chatId } = await window.socketHACKATON.send(eventCreateRoom, { userId });

        props.history.push(`/home/chats/${chatId}`);
    };

    const renderList = (users, rolesToRender, notConfirmed) => {
        const extraColumns = notConfirmed
            ? <>
                <div className={styles.thirdBlock}>
                    <div>{(new Date()).toISOString().substr(0,10)}</div>
                </div>
                <div className={styles.forthBlock}>
                    <div>На рассмотрении</div>
                </div>
            </>
            : null;
        return <Scrollbar autoHeight autoHeightMin='95vh'  >
            {users.map(user => {
                if (!rolesToRender.some((role) => role === user.role )) return null;

                return (
                    <NavLink className={styles.navLink} to={`/home/users/${user.id}`}>
                        <div className={styles.userRow}>
                            <div className={styles.firstBlock}>
                                <div className={styles.avatar} />
                                <div className={styles.name}>{user.firstName + ' ' +user.secondName}</div>
                                <div className={styles.city}>{user.city}</div>
                            </div>
                            <div className={styles.secondBlock}>
                                <div className={styles.age}>{user.sex ? 'Мужской' : 'Женский'} • 24</div>
                            </div>
                            {extraColumns}
                            <div className={styles.lastBlock}>•••</div>
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
