import React from 'react';
import { AuthContext } from "./AuthContext";
import axios from "axios";

const ContentContext = React.createContext('content');
class ContextContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mentors: [],
            children: []
        };
        this.funcs = {
            getAllMentors: this.getAllMentors,
            getAllChildren: this.getAllChildren
        };

        window.cc = this;
    }

    componentWillReceiveProps(nextProps) {
       //
    }

    getAllChildren = () => {
        const onSuccess = (data) => console.log(data);
        const onError = error => console.log(error);
        this.setState({children: [
            {firstName:'KidName1', secondName: 'KidSurname1', birthday: new Date(), orphanage: 'House#1'},
                {firstName:'KidName2', secondName: 'KidSurname2', birthday: new Date(), orphanage: 'House#2'}
            ]})
        // axios.get(`http://192.168.1.96:3000/api/v1/users?role=`, {headers: {
        //         Authorization: `Bearer ${JSON.parse(localStorage.getItem('sunCityUser')).accessToken}`
        //     }})
        //     .then(onSuccess, onError)
    };

    getAllMentors = () => {
        const onSuccess = (data) => console.log(data);
        const onError = error => console.log(error);
        axios.get('http://192.168.1.96:3000/api/v1/users', {headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('sunCityUser')).accessToken}`
        }})
            .then(onSuccess, onError)
    };

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