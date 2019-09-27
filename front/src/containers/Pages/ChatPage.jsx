import React, {useContext, useRef, useEffect} from 'react';
import {ChatContext} from "../../context/ChatContext";

export default function(props) {
    const { localStream } = useContext(ChatContext);
    const videoRef = useRef(null);

    useEffect(() => {
        videoRef.current.srcObject = localStream;
    }, [ localStream ]);

    return (
        <div>
            <h2>Chat room</h2>
            <video
                ref={videoRef}
                playsinline
                autoPlay
                border="5"
            />
        </div>
    );
}
