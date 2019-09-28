import React from "react";
import { Route, Redirect } from "react-router-dom";


import SideBar from "../../SideBar/SideBar";
import styles from './home.module.scss';
import ProfilePage from "../ProfilePage";
import ChatPage from "../ChatPage";

function HomePage() {
    return (
        <React.Fragment>
            <SideBar />
            <div className={styles.mainContainer}>
                <Route exact path="/home/profile" component={ProfilePage} />
                <Route exact path="/home/chat" component={ChatPage} />
                <Redirect to='/home/profile'/>
            </div>
        </React.Fragment>
    )
}

export default HomePage;