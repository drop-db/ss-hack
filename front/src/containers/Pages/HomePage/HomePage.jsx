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
    const {fetchInit, calling} = useContext(ContentContext);

    useEffect(() => {
        if (user) fetchInit(user)
    }, []);



    const isAdmin = user.role === ROLES.ADMIN;
    return (
        <React.Fragment>
            <SideBar />
            <div className={styles.mainContainer}>
                <Route path="/home/profile" component={ProfilePage} />
                {!calling ? (
                    <React.Fragment>
                        <Route exact path="/home/chats" component={ChooseChat} />
                        <Route path="/home/chats/:id" component={ChatPage} />
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Route path="/home/chats" component={ChatPage} />
                    </React.Fragment>
                )}
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


export default HomePage;