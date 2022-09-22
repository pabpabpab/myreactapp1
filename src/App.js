import './App.sass';
import Contacts from './components/Contacts';
import Messages from './components/Messages';
import Input from './components/Input';
import {createContext} from 'react';

import useContacts from './components/myHooks/useContacts';
import useCorrespondent from './components/myHooks/useCorrespondent';
import useMessages from './components/myHooks/useMessages';
import useFilteredMessages from './components/myHooks/useFilteredMessages';

export const AppContext = createContext(null);

function App() {
    const {contacts} = useContacts();
    const {correspondentId, changeCorrespondentIdCB} = useCorrespondent(contacts);

    const {allMessages, updateFlag, sendMessageCB} = useMessages();
    const {filteredMessages} = useFilteredMessages(correspondentId, allMessages, updateFlag);

    /*
    const {msgState, sendMessageCB} = useMessages2();
    const {filteredMessages} = useFilteredMessages2(correspondentId, msgState);
   */

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

