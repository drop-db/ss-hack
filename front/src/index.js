import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


(function() {
    if(!navigator.mediaDevices) navigator.mediaDevices = {};
    if(!navigator.mediaDevices.getUserMedia) {
        var getUserMedia = (
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia ||
            navigator.getUserMedia
        );

        if(getUserMedia) {
            navigator.mediaDevices.getUserMedia = function(constraints) {
                return new Promise(function(resolve, reject) {
                    getUserMedia(constraints,
                        function(stream) { resolve(stream); },
                        function(error) { reject(error); }
                    )
                });
            };
        }
        else {
            navigator.mediaDevices.getUserMedia = function() {
                return new Promise(function(resolve, reject) {
                    reject('getUserMedia is not supported in this browser.')
                });
            };
        }
    }
})();

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
