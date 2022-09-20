import React, {useEffect, useRef} from 'react';

const ContactItem = ({ contact, correspondentId, changeCorrespondentIdCB }) => {
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

export default ContactItem;