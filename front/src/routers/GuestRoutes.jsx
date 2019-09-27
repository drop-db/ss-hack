import React from "react";
import { Route, Redirect } from "react-router-dom";

import LoginPage from "../containers/Pages/LoginPage";
import RegisterPage from "../containers/Pages/RegisterPage";
import ChatPage from "../containers/Pages/ChatPage";

export default function GuestRoutes() {
    return [
        <Route exact path="/login" component={LoginPage} />,
        <Route exact path="/register" component={RegisterPage} />,
        <Redirect to="/login" />
    ];
}

GuestRoutes.propTypes = {};
