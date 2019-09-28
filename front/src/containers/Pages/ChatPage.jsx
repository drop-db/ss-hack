import React, {useContext, useRef, useEffect} from 'react';
import {ChatContext} from "../../context/ChatContext";
import Button from "../../components/common/Button/Button";

export default function(props) {
    const { localStream, startCall } = useContext(ChatContext);
    const videoRef = useRef(null);

    useEffect(() => {
        videoRef.current.srcObject = localStream;
    }, [ localStream ]);

    return (
        <div>
            <h2>Chat room</h2>
            <Button onClick={startCall}>
                Start call
            </Button>
            <video
                ref={videoRef}
                playsInline
                autoPlay
                border="5"
            />
        </div>
    );
}
