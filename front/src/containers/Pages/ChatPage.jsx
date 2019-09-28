import React, {useContext, useRef, useEffect} from 'react';
import {ChatContext} from "../../context/ChatContext";
import Button from "../../components/common/Button/Button";

export default function(props) {
    const { localStream, remoteStream, startCall } = useContext(ChatContext);
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);

    useEffect(() => {
        localVideoRef.current.srcObject = localStream;
    }, [ localStream ]);
    useEffect(() => {
        remoteVideoRef.current.srcObject = localStream;
    }, [ remoteStream ]);

    return (
        <div>
            <h2>Chat room</h2>
            <Button onClick={startCall}>
                Start call
            </Button>
            <video
                ref={localVideoRef}
                playsInline
                autoPlay
                border="5"
            />
            <video
                ref={remoteVideoRef}
                playsInline
                autoPlay
                border="5"
            />
        </div>
    );
}
