import React from 'react';
import _ from 'lodash';
import 'webrtc-adapter';

import SocketClient from "../modules/SocketClient";
import { AuthContext } from "./AuthContext";

import ICE_SERVERS from '../const/stunServers';
import host from '../const/host';
import {isFirefox, isMobile, isSafari} from "../helpers/browserDetector";
import {CHROME_CONSTRAINS, FF_CONSTRAINS, MAC_FF_CONSTRAINS, SAFARI_CONSTRAINS} from "../const/constrains";

import {WEBRTC_TYPES} from '../const/webrtc_types';

const {OFFER, ANSWER, CANDIDATE, WEBRTC} = WEBRTC_TYPES;
const DEFAULT_STATE = {
    localStream: null,
    remoteStream: null
};
const OFFER_OPTIONS = {
    offerToReceiveAudio: true,
    offerToReceiveVideo: true,
};

const ChatContext = React.createContext('chat');

class ChatContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = DEFAULT_STATE;
        this.funcs = {
            sendMessage: this.sendMessage,
            startCall: this.startCall
        };

        this.eventHandlers = [
            {key: WEBRTC, handler: this.handleWebRTCData},
            // {key: "chat:message", handler: this.addNewMessage},
        ];


        this._peerConnections = {};
        this._tableOfWaitingResults = {};
        this._iceCandidateListeners = {};

        window.ff = this;
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.getUserMedia = (constrains, res, rej) => {
                return navigator.mediaDevices.getUserMedia(constrains)
                    .then(res)
                    .catch(rej);
            };
        }

        const {authValue} = props;
        if (authValue && authValue.user) {
            this.getStarted();
        }
    }

    getStarted = async () => {
        this.socket = new SocketClient({events: this.eventHandlers, url: host.HOST});
        window.socketHACKATON = this.socket;
    };

    send = async (event, data) => {
        return await this.socket.send(event, data);
    };

    _sendWebRTCMessage = async (data) => {
        console.log(`sending...${data.toUserId}`);
        await this.send(WEBRTC, data);
    };

    componentWillReceiveProps({authValue: nextAuthValue}) {
        const {authValue} = this.props;
        if (!authValue.user && nextAuthValue.user) {
            this.getStarted();
        }
        if (authValue.user && !nextAuthValue.user) {
            this.socket.disconnect();
            this.setState(DEFAULT_STATE);
        }
    }

    sendMessage = async (toUser, message) => {
        await this.send("chat:sendMessage", { toUser, message });
    };

    startCall = async (toUserId) => {
        const { authValue } = this.props;

        const peer = await this._createPeerConnection(toUserId);
        this._addPeerConnection(peer, toUserId);
        const offer = await peer.createOffer(OFFER_OPTIONS);
        await peer.setLocalDescription(offer);
        offer.sdp = setMediaBitrate(offer.sdp);

        const userId = authValue && authValue.user && authValue.user.id || 'TEST_VALUE';
        const dataToSend = buildDataForEstablishWebRTC(userId, toUserId, OFFER, offer.sdp);
        this._sendWebRTCMessage(dataToSend);

        const answerPromise = this._waitRemoteAnswer(toUserId);
        this._ensureIceCandidateExchange(userId, peer, toUserId, answerPromise);
        return await answerPromise;
    };

    _createPeerConnection = async (toUserId) => {
        const { localStream } = this.state;
        const peerConnection = new window.RTCPeerConnection({
            iceServers: ICE_SERVERS,
            bundlePolicy: 'max-compat',
        });
        peerConnection.oniceconnectionstatechange = () => {
            if (peerConnection.iceConnectionState === 'connected') {
                const remoteStream = this._peerConnections[toUserId].getRemoteStreams()[0];
                this.setState({ remoteStream });
                peerConnection.oniceconnectionstatechange = null;
            }
        };
        if (!localStream) {
            await new Promise(resolve => this._runVideo(resolve));
        }
        if (this._promiseRequestCamera) await this._promiseRequestCamera;

        const recentLocalStream = localStream || this.state.localStream;
        if (recentLocalStream) peerConnection.addStream(recentLocalStream);
        return peerConnection;
    };

    _runVideo = (resolve) => {
        return Promise.resolve()
            .then(this._checkAndRequestCamera)
            .then(resolve)
            .catch(err => {
                resolve(err);
            });
    };

    _checkAndRequestCamera = () => {
        const { localStream } = this.state;
        if (!localStream) {
            this._promiseRequestCamera = this._requestCamera();
            return this._promiseRequestCamera;
        }
    };

    _requestCamera = () => {
        return this._requestVideoWithResolutionCheck()
            .then(localStream => {
                this.setState({ localStream });

                const track = localStream.getTracks()[0];
                if (track && isFirefox()) track.addEventListener('ended', this._clearLocalStream);
                return null;
            })
            .catch(e => {
                this.setState({ localStream: null });
                console.error(e);
            });
    };

    _requestVideoWithResolutionCheck = () => {
        const { localStream } = this.state;
        const constrains = _setFrameRateForVideo(_getVideoConstrains());

        if ((isFirefox() || isMobile()) && localStream) {
            const track = localStream.getTracks()[0];
            if (track) track.removeEventListener('ended', this._clearLocalStream);
            localStream.stop();
        }

        return new Promise((res, rej) => {
            return this._getUserMediaGenerator(constrains, res, rej, 0);
        });
    };

    _getUserMediaGenerator = (constrains, resolve, reject, i) => {
        this._requestInputDevice(constrains[i])
            .then(stream => {
                this._constrainsInUse = constrains[i];
                return stream;
            })
            .then(resolve)
            .catch(err => {
                const k = i + 1;
                if (constrains[k]) {
                    this._getUserMediaGenerator(constrains, resolve, reject, k);
                } else {
                    this._constrainsInUse = {
                        audio: false,
                        video: false,
                    };
                    reject(err);
                }
            });
    };

    _requestInputDevice = (constraints) => {
        console.log('requesting...', constraints);
        return new Promise((resolve, reject) => navigator.getUserMedia(constraints, resolve, reject));
    };

    _clearLocalStream = () => {
        const localStream = null;
        this.setState({ localStream });
    };

    _ensureIceCandidateExchange(userId, peerConnection, toUserId, promise) {
        const streamId = `${userId}_${toUserId}`;

        peerConnection.onicecandidate = (event) => {
            if (!event.candidate) return;
            promise.then(async () => {
                this._sendWebRTCMessage({
                    userId,
                    toUserId,
                    candidate: event.candidate,
                    type: CANDIDATE,
                });
            });
        };

        this._iceCandidateListeners[streamId] = dto => {
            return promise.then(() => {
                const candidate = new window.RTCIceCandidate(dto);
                return peerConnection.addIceCandidate(candidate);
            });
        };
    }

    handleWebRTCData = async (data) => {
        switch (data.type) {
            case OFFER:
                await this._handleRemoteOffer(data);
                break;

            case ANSWER:
                await this._handleAnswer(data);
                break;

            case CANDIDATE:
                await this._handleRemoteIceCandidate(data);
                break;

            default:
                break;
        }
    };

    _handleAnswer = async (data) => {
        await this._processAnswer(_.get(this._peerConnections, `${data.userId}`), data.sdp);
        this._tableOfWaitingResults[data.userId].resolve();
        delete this._tableOfWaitingResults[data.userId];
    };

    _processAnswer = async (peerConnection, answerSdp) => {
        const answer = new window.RTCSessionDescription({
            type: 'answer',
            sdp: answerSdp,
        });
        return await peerConnection.setRemoteDescription(answer);
    };

    _handleRemoteIceCandidate = async (dto) => {
        const { userId: toUserId, candidate } = dto;
        const { authValue } = this.props;

        const userId = authValue && authValue.user && authValue.user.id || 'TEST_VALUE';
        const streamId = `${userId}_${toUserId}`;

        const listener = this._iceCandidateListeners[streamId];
        if (listener) return await listener(candidate);
        return null;
    };

    //         userId - tot kto prisilaet offer
    //         sdp
    _handleRemoteOffer = async (data) => {
        const { authValue } = this.props;
        const toUserId = data.userId;

        const offer = new window.RTCSessionDescription({
            type: OFFER,
            sdp: data.sdp,
        });

        // preventing incoming connection if we already send offer
        // const isAlreadyHasConnection = _.get(this._tableOfWaitingResults, toUserId, false);
        // const isLastConnection = this.attendees.indexOf(this.userLabel) < this.attendees.indexOf(toUserId);
        // if (isAlreadyHasConnection && isLastConnection) {
        //     return;
        // }

        const peer = await this._createPeerConnection(toUserId);
        this._addPeerConnection(peer, toUserId);
        await peer.setRemoteDescription(offer);

        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        answer.sdp = setMediaBitrate(answer.sdp);

        const userId = authValue && authValue.user && authValue.user.id || 'TEST_VALUE';
        this._ensureIceCandidateExchange(userId, peer, toUserId, Promise.resolve());

        this._sendWebRTCMessage(
            buildDataForEstablishWebRTC(userId, toUserId, ANSWER, answer.sdp)
        );
    };

    _addPeerConnection = (peerConnection, toUserId) => {
        this._peerConnections[toUserId] = peerConnection;
        return peerConnection;
    };

    _waitRemoteAnswer = async (toUserId) => {
        return await new Promise((resolve, reject) => {
            this._tableOfWaitingResults[toUserId] = {resolve, reject};
        });
    };

    render() {
        return (
            <ChatContext.Provider value={{...this.state, ...this.funcs}}>
                {this.props.children}
            </ChatContext.Provider>);
    }
}

function Container(props) {
    return (
        <AuthContext.Consumer>
            {value => <ChatContainer authValue={value} {...props} />}
        </AuthContext.Consumer>
    );
}

const _getVideoConstrains = () => {
    if (isFirefox()) {
        const isMacBrowser = navigator.platform.indexOf('Mac') !== -1;
        return isMacBrowser ? MAC_FF_CONSTRAINS : FF_CONSTRAINS;
    }
    if (isSafari()) {
        return SAFARI_CONSTRAINS;
    }
    return CHROME_CONSTRAINS;
};

const _setFrameRateForVideo = (constrains) => {
    for (let i = 0; i < constrains.length; i++) {
        if (constrains[i].video && _.isPlainObject(constrains[i].video)) {
            constrains[i].video.frameRate = {min: 15, exact: 15, max: 25};
        }
    }
    return constrains;
};

const setMediaBitrate = (sdp, mediaType = 'audio', bitRate = 128) => {
    const lines = sdp.split('\n');
    let line = -1;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].indexOf('m=' + mediaType) === 0) {
            line = i;
            break;
        }
    }
    if (line === -1) {
        return sdp;
    }
    line++;

    while (lines[line].indexOf('i=') === 0 || lines[line].indexOf('c=') === 0) {
        line++;
    }

    if (lines[line].indexOf('b') === 0) {
        lines[line] = 'b=AS:' + bitRate;
        return lines.join('\n');
    }

    let newLines = lines.slice(0, line);
    newLines.push('b=AS:' + bitRate);
    newLines = newLines.concat(lines.slice(line, lines.length));
    return newLines.join('\n');
};

const buildDataForEstablishWebRTC = (userId, toUserId, type, sdp) => {
    return {
        userId,
        toUserId,
        type,
        sdp,
    };
};

export default Container;
export {ChatContext};
