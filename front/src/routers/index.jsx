import React, {useContext} from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import {AuthContext} from '../context/AuthContext';
import Main from '../containers/Main/Main';
import GuestRoutes from './GuestRoutes';
import ChildRoutes from './ChildRoutes';

export default function AppRouters() {
    const { user } = useContext(AuthContext);
    const routes = user ? ChildRoutes() : GuestRoutes();

    return (
        <Router>
            <Main>
                <Switch>
                    {routes.map((Element, index) => (
                        <Element.type key={index} {...Element.props} />
                    ))}
                </Switch>
            </Main>
        </Router>
    );
}
