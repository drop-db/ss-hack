import React from 'react';
import { AuthContext } from "./AuthContext";
import axios from "axios";
import _ from 'lodash';

import ROLES from '../const/roles';
import host from '../const/host';

const ContentContext = React.createContext('content');
class ContextContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
        this.funcs = {
            getUsersByRole: this.getUsersByRole,
            getAllUsers: this.getAllUsers
        };

        window.cc = this;
    }

    componentWillReceiveProps(nextProps) {
       //
    }

    getUsersByRole = async (role = '') => {
        const query = `?role=${role}`;

        const data = await axios.get(`${host.HOST_API}/users${query}`, this._getRequestConfig());
        const changedField = {
            [role]: _.get(data, 'data.users', [])
        };

        this.setState({users: { ...this.state.users, ...changedField }})
    };

    getAllUsers = async () => {
        const data = await axios.get(`${host.HOST_API}/users`, this._getRequestConfig());
        const newUsers = _.get(data, 'data.users', []);
        this.setState({users: [ ...newUsers ]})
    };

    _getRequestConfig = () => ({headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('sunCityUser')).accessToken}`
    }});

    render() {
        return (
            <ContentContext.Provider value={{...this.state, ...this.funcs}}>
                {this.props.children}
            </ContentContext.Provider>);
    }
}

export default function Container(props) {
    return (
        <AuthContext.Consumer>
            {value => <ContextContainer authValue={value} {...props} />}
        </AuthContext.Consumer>
    );
}

export {ContentContext};