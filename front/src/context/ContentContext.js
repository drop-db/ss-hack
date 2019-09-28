import React from 'react';
import { AuthContext } from "./AuthContext";
import axios from "axios";

const ContentContext = React.createContext('content');
class ContextContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mentors: []
        };
        this.funcs = {
            getAllMentors: this.getAllMentors
        };

        window.cc = this;
    }

    componentWillReceiveProps(nextProps) {
       //
    }

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