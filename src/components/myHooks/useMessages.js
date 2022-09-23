import {useCallback, useEffect, useReducer} from 'react';
import myFetchFunc from '../functions/myFetchFunc';
import packMessagesIntoMap from '../functions/packMessagesIntoMap';
import myConst from '../functions/getConstants';
import msgReducer from '../functions/msgReducer';

const useMessages = () => {
    // =================== Все сообщения ======================
    /* allMessages - все сообщения на клиенте,
    * для хранения всех сообщений использую структуру Map,
    * где ключи будут userId корреспондентов, а значения - массив сообщений соответствующего корреспондента
    * */
    const [msgState, dispatch] = useReducer(msgReducer, null);

    // Загрузка сообщений с сервера при mount и упаковка в Map
    useEffect(
        () => {
            myFetchFunc('messagesUrl').then(receivedMessages => {
                const map = packMessagesIntoMap(receivedMessages);
                dispatch({ type: myConst.SET_ALL, map });
                // msgState.lastAction = myConst.SET_ALL;
            });
        },
        [],
    );
    // =================== /Все сообщения ======================

    // ============== Колбэк «добавить новое сообщение» ================
    // это колбэк, который отправим в компонент Input
    // он добавляет новое сообщение из Input к сообщениям в Map
    const sendMessageCB = useCallback((message) => {
        if (msgState.messages.has(message.toUserId)) {
            dispatch({ type: myConst.ADD_ONE, message });
            msgState.lastAction = myConst.ADD_ONE;
        }
    }, [msgState]);
    // ============== /Колбэк «добавить новое сообщение» ================


    return {
        msgState,
        dispatch,
        sendMessageCB,
    };
}

export default useMessages;