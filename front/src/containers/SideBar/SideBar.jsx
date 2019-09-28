import React, {useContext, useState, } from 'react';
import {withRouter} from 'react-router';
import classnames from 'classnames';
import {AuthContext} from "../../context/AuthContext";
import styles from './SideBar.module.scss';
import TABS from '../../components/common/Tab/Tab';
import ROLES from '../../const/roles';
import ChatsSideBar from "./ChatsSideBar";
import FiltersSideBar from "./FiltersSideBar";
import Button from "../../components/common/Button/Button";

const { Tab, Tabs } = TABS;

function SideBar(props) {
    const {user, logout} = useContext(AuthContext);
    const isAdmin = user.role === ROLES.ADMIN;
    const handleChange = (event, newValue) => {
        props.history.push(newValue);
    };
    const currentPath = props.history.location.pathname;
    const menuContent = currentPath === '/home/chats'
        ? <ChatsSideBar/>
        : <FiltersSideBar/>;

    return (
        <div className={classnames(styles.sideBar)}>
            <Tabs value={props.history.location.pathname} onChange={handleChange}>
                <Tab classes={styles.tab} index={0} value={'/home/chats'} label={'Chats'}/>
                <Tab classes={styles.tab} index={1} value={'/home/users'} label={'Users'}/>
                <Tab classes={styles.tab} index={2} value={'/home/requests'} label={'Requests'}/>
            </Tabs>
            <div className={styles.sideContent}>
                {menuContent}
            </div>
            <Button onClick={logout}>Logout</Button>
        </div>
    );
}

export default withRouter(SideBar);