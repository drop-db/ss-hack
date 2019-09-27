import React from 'react';
import { AuthContext } from "./AuthContext";

const ChatContext = React.createContext('chat');

const DEFAULT_STATE = {
    rooms: [{name:'First'}, {name:'Second'}]
};

class ChatContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = DEFAULT_STATE;
        this.funcs = {
           console: text => console.log(text)
        };

        window.bb = this;

        const {authValue} = props;
    }

    render() {
        return (
            <ChatContext.Provider value={{...this.state, ...this.funcs}}>
                {this.props.children}
            </ChatContext.Provider>);
    }
}

export default function Container(props) {
    return (
        <AuthContext.Consumer>
            {value => <ChatContainer authValue={value} {...props} />}
        </AuthContext.Consumer>
    );
}

export {ChatContext};
