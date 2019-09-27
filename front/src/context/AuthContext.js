import React from 'react';
import axios from 'axios';
const AuthContext = React.createContext('auth');

const AUTH_STATUS = {
  NOT_TOUCHED: 0,
  AUTHORIZED_BY_TOKEN: 1,
  AUTHORIZED_BY_LOGIN: 2,
  PROCESSING: 3,
  ERROR: 4
};

export default class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            authStatus: AUTH_STATUS.NOT_TOUCHED,
            triedLoginByToken: false
        };
        this.funcs = {
            authorizeByToken: this.authorizeByToken,
            authorizeByEmail: this.authorizeByEmail,
            logout: this.logout,
            testLogin: this.testLogin,
            registerUser: this.registerUser
        };

        window.aa = this;
    }

    testLogin = () => {
        this.setState({user: 'Admin'});
    };

    registerUser = fields => {
        const callback = response => console.log(response);
        axios.post('localhost/api/v1/auth', fields)
            .then( response => callback(response))
    };

    async authorizeByToken(){
        console.log('Authorized by token');
    }

    async authorizeByEmail({email, password}){
        console.log(`Authorized by email ${email} with password ${password}`);
    }

    logout = () => {
        //TODO clean storage
        this.setState({user: null});
    };

    // async componentDidMount() {
    //     await this.authorizeByTokenToken();
    //     this.setState({
    //         triedLoginByToken: true
    //     });
    // }


    render() {
        //if (!this.state.triedLoginByToken) return null;
        return (
            <AuthContext.Provider value={{ ...this.state, ...this.funcs }}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

export { AuthContext };
