import './App.sass';
import Contacts from './components/Contacts';
import Messages from './components/Messages';
import Input from './components/Input';
import {createContext} from 'react';

import useContacts from './components/myHooks/useContacts';
import useMessages from "./components/myHooks/useMessages";

export const AppContext = createContext(null);

/*
const reducer = (state, action) => {
    switch (action.type) {
        default: return state;
    }
}
*/


function App() {
    const {contacts, correspondentId, changeCorrespondentIdCB} = useContacts();

    const {filteredMessages, sendMessageCB} = useMessages(correspondentId);

    return (
        <AppContext.Provider value={{correspondentId, changeCorrespondentIdCB}}>
            <div className="messenger-app">
                <Contacts
                    contacts={contacts}/>
                <Messages
                    messages={filteredMessages}/>
                <Input
                    correspondentId={correspondentId}
                    sendMessageCB={sendMessageCB}/>
            </div>
        </AppContext.Provider>
    );
}

export default App;


// =================================== Сообщения =====================================
/*

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
        setAllMessages(v => v.set(msg.toUserId, [ ...v.get(msg.toUserId), ...[msg] ]) );
        // задействую костыль - сообщаю что изменились allMessages
        // и надо перерендерить filteredMessages
        setF(Date.now());
    }
}, [allMessages]);


*/
// =================================== /Сообщения =====================================
