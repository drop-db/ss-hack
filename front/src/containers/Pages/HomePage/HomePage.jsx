import React, {useContext, useEffect} from "react";
import {Route, Redirect} from "react-router-dom";
import SideBar from "../../SideBar/SideBar";
import styles from './home.module.scss';
import ProfilePage from "../ProfilePage";
import ChatPage from "../ChatPage";
import UsersList from '../UsersList/UsersList';
import {AuthContext} from "../../../context/AuthContext";
import ROLES from "../../../const/roles";
import {ContentContext} from "../../../context/ContentContext";

function HomePage(props) {
    const {user} = useContext(AuthContext);
    const {fetchInit} = useContext(ContentContext);

    useEffect(() => {
        if (user) fetchInit(user)
    }, [ user ]);



    const isAdmin = user.role === ROLES.ADMIN;
    return (
        <React.Fragment>
            <SideBar />
            <div className={styles.mainContainer}>
                <Route path="/home/profile" component={ProfilePage} />
                <Route path="/home/chats" component={ChatPage} />
                <Route path={[ '/home/requests', '/home/users']} component={UsersList} />
                {isAdmin && (
                    <React.Fragment>
                        <Route path={[ '/home/requests', '/home/users']} component={UsersList} />
                    </React.Fragment>
                )}

                <Redirect to='/home/profile'/>
            </div>
        </React.Fragment>
    )
}


export default HomePage;