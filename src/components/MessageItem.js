import React from 'react';

const MessageItem = ({ message }) => {
    return (
        <div title={message.id} className="message-item">
            {message.nick} пишет:<br/>
            {message.text}
        </div>
    );
};

export default MessageItem;