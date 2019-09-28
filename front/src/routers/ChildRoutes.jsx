import React from "react";
import { Route, Redirect } from "react-router-dom";

import HomePage from '../containers/Pages/HomePage/HomePage';

export default function BaseUserRoutes() {
    return [
        <Route path="/home" component={HomePage} />,

        <Redirect to="/home" />
    ];
}
