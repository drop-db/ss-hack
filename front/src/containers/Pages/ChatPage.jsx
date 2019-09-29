import React, {useContext, useRef, useEffect, useState} from "react";
import {withRouter} from 'react-router';
import {ChatContext} from "../../context/ChatContext";
import Button from "../../components/common/Button/Button";
import Input from "../../components/common/TextArea/TextArea";
import styles from './chat.module.scss';
import Scrollbar from "../../components/common/Scrollbar/Scrollbar";
import Form from "../../components/common/Form/Form";
import {ContentContext} from "../../context/ContentContext";
import {AuthContext} from "../../context/AuthContext";

function ChatPage(props) {
    const { localStream, remoteStream, startCall, sendChatMessage } = useContext(ChatContext);
    const { users, chats } = useContext(ContentContext);
    const { user } = useContext(AuthContext);


    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);

    const [message, setMessage] = useState('');

    useEffect(() => {
        localVideoRef.current.srcObject = localStream;
    }, [ localStream ]);
    useEffect(() => {
        remoteVideoRef.current.srcObject = remoteStream;
    }, [ remoteStream ]);

    const getChatId = () => {
        const path = props.history.location.pathname;
        const variablesPath = path.split('/');

        const chatId = variablesPath && variablesPath[variablesPath.length - 1] !== 'chats' && variablesPath[variablesPath.length - 1]
        console.log(`you in chat id ${chatId}`);

        return chatId;
    };

    const handleSendMessage = () => {
        sendChatMessage(getChatId(), message);
    };

    const handleChangeInput = (e) => {
        setMessage(e.target.value);
    };

    const onKeyUp = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            handleSendMessage();
            setMessage('');
        }
    };

    const findUserByChatId = () => {
        const chatId = getChatId();
        const ourChat = chats.filter(chat => chat.id === chatId)[0];
        if (!ourChat) return null;

        const remoteUserId = ourChat.users.filter(userTmp => userTmp !== user.id)[0];

        return remoteUserId;
    };

    const call = () => {
        const userId = findUserByChatId();
        if (!userId) return null;
        startCall(userId);
    };

    /*
* id: "5d8fcd7b081b190017502c3c"
messages: (16) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
name: "Nik и 2"
users: Array(2)
0: "5d8fc37f3ad84b00171a5fd5"
1: "5d8fa4c6923ba700171f05e5"
length: 2
* */

    return (
        <div className={styles.chatPage}>
            <div className={styles.header}>
                <div className={styles.oval} />
                <div className={styles.chatNames}>
                    <div className={styles.name}>Name</div>
                    {/* if users in chat > 2 count of attendee*/}
                </div>
                <Button onClick={call}>
                    Start call
                </Button>
            </div>
            <div className={styles.chatView}>
                <Scrollbar autoHeight autoHeightMin='calc(100vh - 80px - 32px)'>
                    <div className={styles.messagesContainer}>
                    </div>
                    <div className={styles.input}>
                        <input onKeyUp={onKeyUp} value={message} onChange={handleChangeInput}/>
                    </div>
                </Scrollbar>
            </div>


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