import React,{useContext} from 'react';
import { withRouter} from "react-router";
import styles from './Navbar.module.scss';
import {AuthContext} from "../../context/AuthContext";
import Button from "../../components/common/Button/Button";
import Link from "@material-ui/core/Link";

function Navbar(props) {
    const {user, logout} = useContext(AuthContext);

    const handleRedirect = (path) => {
        props.history.push(path);
    }
    return (
        <div className={styles.navBar}>
            <div className={styles.linksInfo}>

                <Link>О сервиса</Link>
                <Link>Инфа</Link>
                <Link>Что-нибудь</Link>
            </div>
            <div className={styles.regContainer}>
                <Button onClick={handleRedirect.bind(this, '/login')}>sign in</Button>
                <Button onClick={handleRedirect.bind(this, '/register')}>sign up</Button>
            </div>

        </div>
    );
}

export default withRouter(Navbar);