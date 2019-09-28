import React, {useContext, useRef, useEffect} from 'react';
import {withRouter} from 'react-router';
import {ChatContext} from "../../context/ChatContext";
import Button from "../../components/common/Button/Button";

function ChatPage(props) {
    const { localStream, remoteStream, startCall } = useContext(ChatContext);
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);

    useEffect(() => {
        localVideoRef.current.srcObject = localStream;
    }, [ localStream ]);
    useEffect(() => {
        remoteVideoRef.current.srcObject = remoteStream;
    }, [ remoteStream ]);

    return (
        <div>
            <h2>Chat room</h2>
            <Button onClick={startCall}>
                Start call
            </Button>
            <video
                key="local"
                ref={localVideoRef}
                playsInline
                autoPlay
                border="5"
            />
            <video
                key="remote"
                ref={remoteVideoRef}
                playsInline
                autoPlay
                border="5"
            />
        </div>
    );
}

export default withRouter(ChatPage);