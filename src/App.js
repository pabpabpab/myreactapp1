import './App.sass';
import Contacts from './components/Contacts';
import Messages from './components/Messages';
import Input from './components/Input';
import {useEffect, useState, useCallback} from 'react';

import myFetchFunc from './data/myFetchFunc';
import packMessagesIntoMap from './data/packMessagesIntoMap';

function App() {
    // =================================== Контакты =====================================
    // Контакты с сервера (в левой части экрана)
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

    // Текущий собеседник (корреспондент) из списка контактов
    const [correspondentId, setCorrespondentId] = useState(0);
    // это колбэк, который отправим в компонент Contacts
    // он устанавливает текущий userId, с которым ведется переписка
    const changeCorrespondentIdCB = useCallback((userId) => {
        setCorrespondentId(userId);
    }, []);

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
    // =================================== /Контакты =====================================

    // =================================== Сообщения =====================================
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

    // это колбэк, который отправим в компонент Input
    // он добавляет новое сообщение из Input к сообщениям в Map
    const sendMessageCB = useCallback((msg) => {
        if (allMessages.has(msg.toUserId)) {
            allMessages.set(msg.toUserId, [ ...allMessages.get(msg.toUserId), ...[msg] ]);
            setAllMessages(allMessages);
            // задействую костыль - сообщаю что изменились allMessages
            // и надо перерендерить filteredMessages
            setF(Date.now());
        }
    }, [allMessages]);
    // =================================== /Сообщения =====================================

    return (
       <div className="messenger-app">
          <Contacts
              contacts={contacts}
              correspondentId={correspondentId}
              changeCorrespondentIdCB={changeCorrespondentIdCB} />
          <Messages
              messages={filteredMessages} />
          <Input
              correspondentId={correspondentId}
              sendMessageCB={sendMessageCB} />
       </div>
    );
}

export default App;
