import React, {useContext, useEffect} from "react";
import {Route, Redirect} from "react-router-dom";
import {withRouter} from "react-router";
import SideBar from "../../SideBar/SideBar";
import styles from './home.module.scss';
import ProfilePage from "../ProfilePage";
import ChatPage from "../ChatPage";
import UsersList from '../UsersList/UsersList';
import {AuthContext} from "../../../context/AuthContext";
import ROLES from "../../../const/roles";
import {ContentContext} from "../../../context/ContentContext";
import {ChatContext} from "../../../context/ChatContext";

function HomePage(props) {
    const {user} = useContext(AuthContext);
    const {fetchInit, getChatByUserId} = useContext(ContentContext);
    const {callingTo} = useContext(ChatContext);

    useEffect(() => {
        if (user) fetchInit(user)
    }, []);

    useEffect(() => {
        if (callingTo) {
            console.log('to');
            props.history.push(`/home/chats/${callingTo.id}`)
        }
    }, [callingTo]);

    const isAdmin = user.role === ROLES.ADMIN;
    return (
        <React.Fragment>
            <SideBar />
            <div className={styles.mainContainer}>
                <Route path="/home/profile" component={ProfilePage} />
                <Route exact path="/home/chats" component={ChooseChat} />
                <Route path="/home/chats/:id" component={ChatPage} />
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

function ChooseChat() {
    return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '25px' }}>
            Выберите собеседника
        </div>
    )
}


export default withRouter(HomePage);