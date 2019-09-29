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
            chats: [],
            showMenu: true,
        };
        this.funcs = {
            setShowMenu: showMenu => this.setState({showMenu}),
            registerChild: this.registerChild,
            getUsersByRole: this.getUsersByRole,
            getAllUsers: this.getAllUsers,
            getAllChildren: this.getAllChildren,
            fetchInit: this.fetchInit,
            approveReport: this.approveReport,
            getUserName: this.getUserName,
            getChat: this.getChat,
            fetchChats: this.fetchChats,
            addChat: this.addChat
        };

        window.cc = this;
    }

    approveReport = async (mentorId) => {
        const onSuccess = (data) => console.log(data);
        const onError = error => console.log(error);
        axios.put(`${host.HOST_API}/users/activity/${mentorId}`, {}, this._getRequestConfig())
            .then( onSuccess, onError)
    };

    fetchInit = async (user) => {
        await this.getAllUsers();
        await this.fetchChats(user);

        // todo attach user and chats in context

    }

    addChat = (chat) => {
        if (this.state.chats.some(chatTmp => chat.id === chatTmp.id)) return;
        this.setState({ chats: [ ...this.state.chats, chat ] });
    };

    fetchChats = async (user) => {
        const { chats } = await window.socketHACKATON.send('messages:chats', {userId: user.id});
        this.setState({ chats });
        console.log('fetched! ', chats);
    };

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

    getUserName = (userId) => {
        const userObj = this.state.users.filter(userTmp => userTmp.id === userId)[0];
        if (!userObj) return null;

        return `${userObj.firstName} ${userObj.secondName}`;

    };
    getChat = (chatId) => {
        const chatObj = this.state.chats.filter(chatTmp => chatTmp.id === chatId)[0];
        return chatObj
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