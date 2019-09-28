import React, {useContext, useEffect} from 'react';
import styles from './Main.module.scss';
const Main = props => {
    return (
        <div className={styles.container}>
            {props.children}
        </div>
    );
};

export default Main;