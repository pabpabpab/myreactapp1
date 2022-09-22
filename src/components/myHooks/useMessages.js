import {useCallback, useEffect, useState} from 'react';
import myFetchFunc from '../../data/myFetchFunc';
import packMessagesIntoMap from '../../data/packMessagesIntoMap';

const useMessages = () => {

    // =================== Все сообщения ======================

    /* allMessages - все сообщения на клиенте,
    * для хранения всех сообщений использую структуру Map,
    * где ключи будут userId корреспондентов, а значения - массив сообщений соответствующего корреспондента
    * */
    const [allMessages, setAllMessages] = useState(null);

    // Загрузка сообщений с сервера при mount и упаковка в Map
    useEffect(
        () => {
            myFetchFunc('messagesUrl').then(receivedMessages => {
                const map = packMessagesIntoMap(receivedMessages);
                setAllMessages(map);
            });
        },
        [],
    );
    // =================== /Все сообщения ======================


    // костыль для придания реактивности структуре Map (allMessages) в нужный момент
    const [updateFlag, setUpdateFlag] = useState(0);

    // ============== Колбэк «добавить новое сообщение» ================
    // это колбэк, который отправим в компонент Input
    // он добавляет новое сообщение из Input к сообщениям в Map
    const sendMessageCB = useCallback((msg) => {
        if (allMessages.has(msg.toUserId)) {
            setAllMessages(v => v.set(msg.toUserId, [ ...v.get(msg.toUserId), ...[msg] ]) );
            // костылик - сообщаю что изменились allMessages
            // и надо перерендерить filteredMessages
            setUpdateFlag(Date.now());
        }
    }, [allMessages]);
    // ============== /Колбэк «добавить новое сообщение» ================

    return {
        allMessages,
        updateFlag,
        sendMessageCB,
    };
}

export default useMessages;


/*
const reducer = (state, action) => {
    switch (action.type) {
        default: return state;
    }
}
*/
