import React,{useContext} from 'react';
import {AuthContext} from "../../context/AuthContext";
import NavBar from '../Main/Navbar';
import Footer from '../Main/Footer';

export default function(props) {
    const {user} = useContext(AuthContext);
    return (
        <div >
            <NavBar />
            <Footer />
        </div>
    );
}
