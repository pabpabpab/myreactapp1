import './App.sass';
import Contacts from './components/Contacts';
import Messages from './components/Messages';
import Input from './components/Input';
import {createContext} from 'react';

import useContacts from './components/myHooks/useContacts';
import useMessages from "./components/myHooks/useMessages";

export const AppContext = createContext(null);

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

