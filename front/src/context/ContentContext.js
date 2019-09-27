import React from 'react';
import { AuthContext } from "./AuthContext";

const ContentContext = React.createContext('content');
class ContextContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           someContent: 'ᕦ(ò_óˇ)ᕤ'
        };
        this.funcs = {};

        window.cc = this;
    }

    componentWillReceiveProps(nextProps) {
       //
    }

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