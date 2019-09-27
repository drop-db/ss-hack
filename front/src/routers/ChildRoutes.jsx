import React from "react";
import { Route, Redirect } from "react-router-dom";

import ProfilePage from "../containers/Pages/ProfilePage";
import ChatPage from "../containers/Pages/ChatPage";

export default function BaseUserRoutes() {
    return [
        <Route exact path="/profile" component={ProfilePage} />,
        <Route exact path="/chat" component={ChatPage} />,
        <Redirect to="/profile" />
    ];
}