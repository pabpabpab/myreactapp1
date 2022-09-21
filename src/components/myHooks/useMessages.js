import {useCallback, useEffect, useState} from 'react';
import myFetchFunc from '../../data/myFetchFunc';
import packMessagesIntoMap from '../../data/packMessagesIntoMap';

const useMessages = (correspondentId) => {

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

    // костыль для придания реактивности структуре Map (allMessages) в нужный момент
    const [f, setF] = useState(0);
    // =================== /Все сообщения ======================


    // ============== Колбэк «добавить новое сообщение» ================
    // это колбэк, который отправим в компонент Input
    // он добавляет новое сообщение из Input к сообщениям в Map
    const sendMessageCB = useCallback((msg) => {
        if (allMessages.has(msg.toUserId)) {
            setAllMessages(v => v.set(msg.toUserId, [ ...v.get(msg.toUserId), ...[msg] ]) );
            // костылик - сообщаю что изменились allMessages
            // и надо перерендерить filteredMessages
            setF(Date.now());
        }
    }, [allMessages]);
    // ============== /Колбэк «добавить новое сообщение» ================


    // ================= Фильтрованные сообщения ====================
    // переписка с выбранным корреспондентом
    const [filteredMessages, setFilteredMessages] = useState([]);
    useEffect(
        () => {
            setFilteredMessages([]);
            if (allMessages?.size && correspondentId && allMessages.has(correspondentId)) {
                setFilteredMessages(allMessages.get(correspondentId));
            }
        },
        [correspondentId, allMessages, f]
    );
    // ================= /Фильтрованные сообщения ====================


    return {filteredMessages, sendMessageCB};
}

export default useMessages;