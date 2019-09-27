import React, { Component } from 'react';
import './App.css';
import AuthContextContainer from './context/AuthContext.js';
import ContentContext from './context/ContentContext.js';
import ChatContext from './context/ChatContext.js';
import Routers from './routers';

class App extends Component {
  render() {
    return (
        <div className="App">
          <AuthContextContainer>
            <ContentContext>
              <ChatContext>
                <Routers/>
              </ChatContext>
            </ContentContext>
          </AuthContextContainer>
        </div>
    );
  }
}

export default App;