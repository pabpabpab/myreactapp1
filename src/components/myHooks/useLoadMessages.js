import {useEffect, useState} from 'react';
import myFetchFunc from '../../data/myFetchFunc';
import packMessagesIntoMap from '../../data/packMessagesIntoMap';

// Получить и упаковать все сообщения при mount
const useLoadMessages = () => {

    /* allMessages - все сообщения на клиенте,
    * для хранения всех сообщений использую структуру Map,
    * где ключи будут userId корреспондентов,
    * а значения - массив сообщений соответствующего корреспондента    *
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

    return {
        allMessages,
        setAllMessages,
    };
}

export default useLoadMessages;
