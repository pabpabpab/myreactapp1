import React, {useEffect, useRef} from 'react';
import MessageItem from './MessageItem';

const Messages = ({ messages }) => {
    const chatDivRef = useRef(null);
    // пусть всегда div сообщений будет проскроллен вниз
    useEffect(() => {chatDivRef.current.scrollTop += 1000;});

    return (
        <div ref={chatDivRef} className="messages">
            {
                messages.map((message) => <MessageItem message={message} key={message.id} />)
            }
        </div>
    );
};

export default Messages;