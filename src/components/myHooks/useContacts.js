import {useCallback, useEffect, useState} from 'react';
import myFetchFunc from "../../data/myFetchFunc";

const useContacts = () => {
    // =========Контакты с сервера (в левой части экрана)==========
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
    // =========/Контакты с сервера (в левой части экрана)==========

    // ===========Текущий собеседник (корреспондент)===============
    const [correspondentId, setCorrespondentId] = useState(0);

    // Установка начального корреспондента при mount
    useEffect(
        () => {
            if (contacts.length && !correspondentId) {
                const firstUserId = contacts[0].userId;
                setCorrespondentId(firstUserId);
            }
        },
        [contacts, correspondentId]
    );

    // это колбэк, который отправим в компонент Contacts
    // он устанавливает текущий userId, с которым ведется переписка
    const changeCorrespondentIdCB = useCallback((userId) => {
        setCorrespondentId(userId);
    }, []);
    // ===========/Текущий собеседник (корреспондент)===============

    return {
        contacts,
        correspondentId,
        changeCorrespondentIdCB,
    };
}

export default useContacts;