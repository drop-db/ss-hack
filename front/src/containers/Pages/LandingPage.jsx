import React,{useContext} from 'react';
import {AuthContext} from "../../context/AuthContext";
import NavBar from '../Main/Navbar';
import Footer from '../Main/Footer';
import styles from './landing.module.scss';
import Scrollbar from "../../components/common/Scrollbar/Scrollbar";
export default function(props) {
    const {user} = useContext(AuthContext);
    return (
        <Scrollbar autoHeight autoHeightMin={'100vh'}>
            <div className={styles.container}>
                <NavBar />
            </div>
        </Scrollbar>
    );
}
