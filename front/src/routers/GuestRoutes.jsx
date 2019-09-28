import React from "react";
import { Route, Redirect } from "react-router-dom";

import LoginPage from "../containers/Pages/LoginPage";
import RegisterPage from "../containers/Pages/RegisterPage";
import LandingPage from "../containers/Pages/LandingPage";

export default function GuestRoutes() {
    return [
        <Route exact path="/" component={LandingPage} />,
        <Route exact path="/login" component={LoginPage} />,
        <Route exact path="/register" component={RegisterPage} />,
        <Redirect to="/" />
    ];
}

GuestRoutes.propTypes = {};
