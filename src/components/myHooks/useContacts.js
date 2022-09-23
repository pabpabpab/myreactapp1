import {useEffect, useState} from 'react';
import myFetchFunc from "../functions/myFetchFunc";

// Контакты с сервера (в левой части экрана)
const useContacts = () => {
    const [contacts, setContacts] = useState([]);

    // Загрузка контактов с сервера при mount
    useEffect(
        () => {
            myFetchFunc('contactsUrl').then(receivedContacts => {
                setContacts(receivedContacts)
            });
        },
        [],
    );

    return {
        contacts,
    };
}

export default useContacts;