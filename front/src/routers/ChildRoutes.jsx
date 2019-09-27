import React from "react";
import { Route, Redirect } from "react-router-dom";

import ProfilePage from "../containers/Pages/ProfilePage";

export default function BaseUserRoutes() {
    return [
        <Route exact path="/profile" component={ProfilePage} />,
        <Redirect to="/profile" />
    ];
}