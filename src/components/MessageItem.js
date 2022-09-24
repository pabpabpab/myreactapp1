import React from 'react';
import PropTypes from 'prop-types';

const MessageItem = ({ message }) => {
    return (
        <div title={message.id} className="message-item">
            {message.nick} пишет:<br/>
            {message.text}
        </div>
    );
};

MessageItem.propTypes = {
    message: PropTypes.shape({
        id: PropTypes.number.isRequired,
        userId: PropTypes.number,
        toUserId: PropTypes.number.isRequired,
        nick: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
    }),
}

export default MessageItem;