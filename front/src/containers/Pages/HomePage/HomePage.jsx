import React, {useContext} from "react";
import { Route, Redirect } from "react-router-dom";


import SideBar from "../../SideBar/SideBar";
import styles from './home.module.scss';
import ProfilePage from "../ProfilePage";
import ChatPage from "../ChatPage";
import UsersList from '../UsersList/UsersList';
import RegistrationRequests from '../RegistrationRequests/RegistrationRequests';
import ChildrenList from '../ChildrenList/ChildrenList';

import {AuthContext} from "../../../context/AuthContext";
import ROLES from "../../../const/roles";

function HomePage() {
    const {user, logout} = useContext(AuthContext);

    const isAdmin = user.role === ROLES.ADMIN;

    return (
        <React.Fragment>
            <SideBar />
            <div className={styles.mainContainer}>
                <Route exact path="/home/profile" component={ProfilePage} />
                <Route exact path="/home/chats" component={ChatPage} />
                {isAdmin && (
                    <React.Fragment>
                        <Route exact path={[ "/home/requests", '/home/users' ]} component={UsersList} />
                    </React.Fragment>
                )}
                <Redirect to='/home/profile'/>
            </div>
        </React.Fragment>
    )
}

function PsychologistsList() {
    return <div>PsychologistsList</div>
}

export default HomePage;