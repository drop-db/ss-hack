import React from 'react';
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
            authorizeByLogin: this.authorizeByLogin,
            logout: this.logout,
            testLogin: this.testLogin
        };

        window.aa = this;
    }

    testLogin = () => {
        this.setState({user: 'Admin'});
    }

    async authorizeByToken(){
        console.log('Authorized by token');
    }

    async authorizeByLogin({login, password}){
        console.log(`Authorized by login ${login} with password ${password}`);
    }

    logout = () => {
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
