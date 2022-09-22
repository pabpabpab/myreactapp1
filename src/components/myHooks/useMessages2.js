// НЕ ИСПОЛЬЗУЕТСЯ
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
            if (map.has(msg.toUserId)) {
                const newValue = [ ...map.get(msg.toUserId), ...[msg] ];
                const newState = {...state, messages: map.set(msg.toUserId, newValue)};
                console.log(newState);
                return newState;
            }
            return state;
        default: return state;
    }
}


const useMessages2 = () => {

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

export default useMessages2;