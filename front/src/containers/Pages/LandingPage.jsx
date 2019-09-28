import React,{useContext} from 'react';
import {AuthContext} from "../../context/AuthContext";
import NavBar from '../Main/Navbar';
import Footer from '../Main/Footer';
import styles from './landing.scss';
export default function(props) {
    const {user} = useContext(AuthContext);
    return (
        <div >
            <NavBar />
            <div className={styles.content}>
                <div className={styles.block}>
                    <img alt="img"/>
                    <div className={styles.text}>textblock</div>
                </div>
                <div className={styles.block}>
                    <div className={styles.block}>
                        <img alt="img"/>
                        <div className={styles.text}>textblock</div>
                    </div>
                </div>
                <div className={styles.loginBlock}>
                    ...
                </div>
            </div>
            <Footer />
        </div>
    );
}
