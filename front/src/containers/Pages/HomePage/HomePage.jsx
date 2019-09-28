import React, {useContext} from "react";
import { Route, Redirect } from "react-router-dom";


import SideBar from "../../SideBar/SideBar";
import styles from './home.module.scss';
import ProfilePage from "../ProfilePage";
import ChatPage from "../ChatPage";
import MentorsList from '../MentorsList/MentorsList';
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
                <Route exact path="/home/chat" component={ChatPage} />
                {isAdmin && (
                    <React.Fragment>
                        <Route exact path="/home/requests" component={RegistrationRequests} />
                        <Route exact path="/home/children" component={ChildrenList} />
                        <Route exact path="/home/mentors" component={MentorsList} />
                        <Route exact path="/home/psyhologists" component={PsychologistsList} />
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