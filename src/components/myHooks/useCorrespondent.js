import {useCallback, useEffect, useState} from 'react';

// Текущий собеседник (корреспондент)
const useCorrespondent = (contacts) => {
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

    // Это колбэк, который отправим в компонент Contacts
    // он устанавливает текущий userId, с которым ведется переписка
    const changeCorrespondentIdCB = useCallback((userId) => {
        setCorrespondentId(userId);
    }, []);

    return {
        correspondentId,
        changeCorrespondentIdCB,
    };
}

export default useCorrespondent;