import React, {useContext, useRef, useEffect, useState} from "react";
import classnames from 'classnames';
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
    const { localStream, remoteStream, callingTo, startCall, dropCall,sendChatMessage } = useContext(ChatContext);
    const { users, chats, getUserName, getChat } = useContext(ContentContext);
    const { user } = useContext(AuthContext);

    const scrollRef = useRef(null);


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

        const remoteUser = ourChat.users.filter(userTmp => userTmp.id !== user.id)[0];

        return remoteUser && remoteUser.id;
    };

    const call = () => {
        const userId = findUserByChatId();
        if (!userId) return null;
        startCall(userId);
    };

    const dropCallWithUser = () => {
        const userId = findUserByChatId();
        if (!userId) return null;
        dropCall(userId);
    };

    useEffect(() => {
        scrollToBottom();
    },[chats]);

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollToBottom();
        }
    };

    const userName = getUserName(findUserByChatId());
    const chat = getChat(getChatId());

    const isUsersCalling = callingTo && localStream && remoteStream;

    return (
        <div className={styles.chatPage}>
            <div className={styles.header}>
                <div className={styles.oval} />
                <div className={styles.chatNames}>
                    <div className={styles.name}>{userName}</div>
                    {/* if users in chat > 2 count of attendee*/}
                </div>
                <div className={styles.callButtons}>
                    <Button onClick={call}>
                        Позвонить
                    </Button>
                    <Button onClick={dropCallWithUser} classNames={styles.drop}>
                        Завершить звонок
                    </Button>
                </div>
            </div>
            <div className={styles.chatView}>
                <Scrollbar
                    autoHeight
                    autoHeightMin='calc(100vh - 80px - 32px)'
                    scrollbarRef={scrollRef}
                >
                    <div className={styles.messagesContainer}>
                        {chat && chat.messages.map(({message, createdAt, sender}) => {
                            const isMyMessage = sender.id === user.id;
                            return (
                                <div className={classnames(styles.messageWrapper, isMyMessage && styles.myMessage)} key={message}>
                                    <div className={styles.avatar}/>
                                    <div className={classnames(styles.message)}>
                                        <div className={styles.name}>{`${sender.firstName} ${sender.secondName}`}</div>
                                        <div className={styles.time}>{`${new Date(createdAt).getHours()}:${new Date(createdAt).getMinutes()}`}</div>
                                        <div className={styles.text}>{message}</div>
                                    </div>
                                </div>
                            )
                        })}
                        <div className={styles.inputWrapper}>
                            <input className={styles.input} placeholder="Your message" onKeyUp={onKeyUp} value={message} onChange={handleChangeInput}/>
                        </div>
                    </div>
                </Scrollbar>
                <div className={classnames(styles.videosWrapper, !isUsersCalling && styles.hide)}>
                    <div className={styles.videos}>
                        <video
                            key="local"
                            ref={localVideoRef}
                            playsinline
                            autoPlay
                            border="5"
                            className={styles.localVideo}
                        />
                        <video
                            key="remote"
                            ref={remoteVideoRef}
                            playsinline
                            autoPlay
                            border="5"
                            className={styles.remoteVideo}
                        />
                    </div>


                </div>
            </div>
        </div>
    );
}

export default withRouter(ChatPage);