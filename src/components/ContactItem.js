import React, {useEffect, useRef, useContext} from 'react';
import {AppContext} from '../App';
import PropTypes from 'prop-types';


const ContactItem = ({ contact }) => {
    const { correspondentId, changeCorrespondentIdCB } = useContext(AppContext)

    const elRef = useRef(null);

    // это сброс bgColor компонента
    // и установка его в активный цвет при условии если выбран этот Контакт для чата
    useEffect(() => {
        elRef.current.style.backgroundColor = '';
        if (correspondentId === contact.userId) {
            elRef.current.style.backgroundColor = '#a1caa1';
        }
    }, [correspondentId, contact]);

    return (
        <div
            ref={elRef}
            onClick={() => changeCorrespondentIdCB(contact.userId)}
            className="contact-item">
            {contact.nick}
        </div>
    );
};

ContactItem.propTypes = {
    message: PropTypes.shape({
        userId: PropTypes.number.isRequired,
        nick: PropTypes.string.isRequired,
    }),
}

export default ContactItem;
