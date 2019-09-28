import React, {useState} from 'react';
import { NavLink } from "react-router-dom";
import Button from "../../components/common/Button/Button";
import styles from "./Menu.module.scss";

export default function Menu(items1){
    const commonItems = [
        {
            groupName: 'Новосибирск',
            links: [
                {
                    label: 'Психологи',
                    path: '/home/chats/novosibPsyc'
                },
                {
                    label: 'Наставники',
                    path: '/home/chats/novosibMent'
                }
            ]
        },
        {
            groupName: 'Томск',
            links: [
                {
                    label: 'Психологи2',
                    path: '/home/chats/tomskPsyc'
                },
                {
                    label: 'Наставники2',
                    path: '/home/chats/tomskMent'
                }
            ]
        },
        {
            groupName: 'Тверь',
            links: [
                {
                    label: 'Психологи3',
                    path: '/home/chats/tverPsyc'
                },
                {
                    label: 'Наставники3',
                    path: '/home/chats/tverMent'
                }
            ]
        }
    ];

    const privateItems = [
        {label: 'John', path: '/home/chats/1234567'},
        {label: 'James', path: '/home/chats/234567'}
    ];
    const [activeGroup, setActiveGroup] = useState(null);
    return (
        <div className={styles.menuContainer}>
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
                    privateItems.map(privateItem => <NavLink className={styles.navLink} to={privateItem.path}>{privateItem.label}</NavLink>)
                }
            </div>
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