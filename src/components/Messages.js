import React, {useEffect, useRef} from 'react';
import MessageItem from './MessageItem';
import PropTypes from 'prop-types';

const Messages = ({ messages }) => {
    const chatDivRef = useRef(null);
    // пусть всегда div сообщений будет проскроллен вниз
    useEffect(() => {chatDivRef.current.scrollTop += 1000;});

    if (!messages) {
        return (
            <div ref={chatDivRef} className="messages">
                <div className="no-messages">
                    Нет сообщений
                </div>
            </div>
        );
    }

    return (
        <div ref={chatDivRef} className="messages">
            {
                messages.map((message) => <MessageItem message={message} key={message.id} />)
            }
        </div>
    );
};

Messages.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.object),
}

export default Messages;