import React, {useContext, useState,} from 'react';
import {withRouter} from 'react-router';
import classnames from 'classnames';
import {AuthContext} from "../../context/AuthContext";
import styles from './SideBar.module.scss';

import TABS from '../../components/common/Tab/Tab';
import ChatsSideBar from "./ChatsSideBar";
import FiltersSideBar from "./FiltersSideBar";
import Button from "../../components/common/Button/Button";
import {ContentContext} from "../../context/ContentContext";
import ROLES from "../../const/roles";

const {Tab, Tabs} = TABS;

const widthStyle = {minWidth: '115px'};

function SideBar(props) {
    const {user, logout} = useContext(AuthContext);
    const {showMenu, setShowMenu} = useContext(ContentContext);
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        event.preventDefault();
        setValue(newValue);
        props.history.push(newValue);
    };
    const currentPath = props.history.location.pathname.slice(0, 11);
    const menuContent = currentPath === '/home/chats'
        ? <ChatsSideBar/>
        : <FiltersSideBar/>;
    const rolesEngToRus = {
        'mentor': "Наставник (заявка)",
        'curator': "Куратор (заявка)",
        'psychologist': "Психолог (заявка)",
        'confirmedMentor': "Наставник",
        'confirmedCurator': "Куратор",
        'confirmedPsychologist': "Психолог",
        'admin': "Админ",
    };
    const userRole = rolesEngToRus[user.role];
    const isRequest = [ROLES.MENTOR, ROLES.PSYCHOLOGIST, ROLES.CURATOR].includes(user.role);
    const tabs = [
        <Tab style={widthStyle} index={0} value={'/home/chats'} label={'Чаты'}/>,
    ];
    if(!isRequest) {
        tabs.push(<Tab style={widthStyle} index={1} value={'/home/users'} label={'Пользователи'}/>)
        tabs.push(<Tab style={widthStyle} index={2} value={'/home/requests'} label={'Заявки'}/>)
    }
    return (
        <div className={classnames(styles.sideBar, !showMenu && styles.hidden)}>
            <Button onClick={() => setShowMenu(false)} className={styles.toggleButton}>X</Button>
            <div className={styles.self} onClick={() => props.history.push('/home/profile')}>
                <div className={styles.avatar}/>
                <div className={styles.name}>{`${user.lastName} ${user.firstName}`}</div>
                <div className={styles.role}>{userRole}</div>
            </div>
            <Tabs value={value} onChange={handleChange}>
                {tabs}
            </Tabs>
            <div className={styles.sideContent}>
                {menuContent}
            </div>
            <Button onClick={logout}>Выход</Button>
        </div>
    );
}

export default withRouter(SideBar);