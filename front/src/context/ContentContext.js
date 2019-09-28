import React from 'react';
import { AuthContext } from "./AuthContext";
import axios from "axios";
import _ from 'lodash';
import host from '../const/host';

const ContentContext = React.createContext('content');
class ContextContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            children: [],
            users: [],
            chats: []
        };
        this.funcs = {
            registerChild: this.registerChild,
            getUsersByRole: this.getUsersByRole,
            getAllUsers: this.getAllUsers,
            getAllChildren: this.getAllChildren,
            fetchInit: this.fetchInit
        };

        window.cc = this;
    }

    componentWillReceiveProps(nextProps) {
        //
    }

    fetchInit = async (user) => {
        await this.getAllUsers();
        const { chats }= await window.socketHACKATON.send('messages:chats', {userId: user.id});
        this.setState({ chats });
        console.log('fetched! ', chats);


        // todo attach user and chats in context

    }

    getAllChildren = () => {
        const onSuccess = (data) => console.log(data);
        const onError = error => console.log(error);
        this.setState({children: [
            {id:1,firstName:'KidName1', secondName: 'KidSurname1', birthday: new Date(), orphanage: 'House#1'},
                {id:2, firstName:'KidName2', secondName: 'KidSurname2', birthday: new Date(), orphanage: 'House#2'}
            ]})
        // axios.get(`http://192.168.1.96:3000/api/v1/users?role=`, {headers: {
        //         Authorization: `Bearer ${JSON.parse(localStorage.getItem('sunCityUser')).accessToken}`
        //     }})
        //     .then(onSuccess, onError)
    };

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

    registerChild = fields => {
        const onSuccess = () => console.log(fields);
        const onError = error => console.log(error);
        axios.post(`${host.HOST_API}/child`, fields, this._getRequestConfig())
            .then( onSuccess, onError)
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