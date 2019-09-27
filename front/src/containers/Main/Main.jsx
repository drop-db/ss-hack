import React, {useContext, useEffect} from 'react';
import styles from './Main.module.scss';
import Footer from './Footer';
import Navbar from './Navbar';
const Main = props => {
    return (
        <div className={styles.container}>
            <Navbar/>
            {props.children}
            <Footer/>
        </div>
    );
};

export default Main;