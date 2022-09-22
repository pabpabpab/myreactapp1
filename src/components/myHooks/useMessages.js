import {useCallback, useEffect, useReducer} from 'react';
import myFetchFunc from '../../data/myFetchFunc';
import packMessagesIntoMap from '../../data/packMessagesIntoMap';

const SET_ALL = 'setAll';
const ADD_ONE = 'addOne';

const msgReducer = (state, action) => {
    switch (action.type) {
        case SET_ALL:
            return {...state, messages: action.map }
        case ADD_ONE:
            const map = state.messages;
            const msg = action.message;
            const key = msg.toUserId;
            if (map.has(key)) {
                const oldValue = map.get(key);
                const newValue = [ ...oldValue, ...[msg] ];
                state.messages.set(key, newValue);
                return {...state};
            }
            return state;
        default: return state;
    }
}

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
                dispatch({ type: SET_ALL, map });
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
            dispatch({ type: ADD_ONE, message });
        }
    }, [msgState]);
    // ============== /Колбэк «добавить новое сообщение» ================

    return {
        msgState,
        sendMessageCB,
    };
}

export default useMessages;