import React, {useContext, useState} from "react";
import { NavLink } from "react-router-dom";
import Button from "../../components/common/Button/Button";
import styles from "./Menu.module.scss";
import {ContentContext} from "../../context/ContentContext";
import {AuthContext} from "../../context/AuthContext";
import _ from 'lodash';
import Scrollbar from "../../components/common/Scrollbar/Scrollbar";


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

export default function Menu(items1){
    const {chats, getUserName} = useContext(ContentContext);
    const {user} = useContext(AuthContext);

    const commonItems = [];
    const groupedChats = _.groupBy(chats, c => c.city);
    const commonChats = groupedChats[undefined];
    Object.keys(groupedChats).forEach(k => {
        if(k === 'undefined') return;

        const city = cities.find(c => c.value === k);
        const links = groupedChats[k].map(c => ({path: `/home/chats/${c.id}`, label: c.name}));
        commonItems.push({city: k, groupName: city.label, links});
    });



    const getUserNameByChatId = (chatId) => {
        const ourChat = chats.filter(chat => chat.id === chatId)[0];
        if (!ourChat) return null;

        const remoteUser = ourChat.users.filter(userTmp => userTmp.id !== user.id)[0];
        return getUserName(remoteUser && remoteUser.id);
    };

    const privateChats = commonChats.map((chat) => {
        const userName = getUserNameByChatId(chat.id);
        if (userName === null) return null;
        const userInChat = chat.users.find(u => u.id === user.id);
        const label = userInChat ? userName : chat.name;
        return { label, path: `/home/chats/${chat.id}`};
    }).filter(chat => chat !== null);



    const [activeGroup, setActiveGroup] = useState(null);
    return (
        <div className={styles.menuContainer}>
            <Scrollbar autoHeight autoHeightMin={'70vh'} autoHide>
            {commonItems.map((commonItem, index) =>
                <InnerItem
                    links={commonItem.links}
                    key={`${index}_item`}
                    groupName={commonItem.groupName}
                    active={index === activeGroup}
                    onClick={()=>setActiveGroup(index)}
                />)
            }

                <div className={styles.privateChatsBlock}>
                    {
                        privateChats.map(privateItem => <NavLink className={styles.navLink} to={privateItem.path}>{privateItem.label}</NavLink>)
                    }
                </div>
            </Scrollbar>
        </div>
    )
}

function InnerItem({links, groupName, active, onClick}) {
    const visibleLinks = active
        ? links.map(link => <NavLink className={styles.navLink} to={link.path}>{link.label}</NavLink>)
        : <></>;

    return (
        <div>
            <Button onClick={onClick}>{groupName}</Button>
            <div className={styles.navLinks}>
                {visibleLinks}
            </div>
        </div>
    )
}