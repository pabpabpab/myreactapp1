import './App.sass';
import Contacts from './components/Contacts';
import Messages from './components/Messages';
import Input from './components/Input';
import {createContext} from 'react';

import useContacts from './components/myHooks/useContacts';
import useCorrespondent from './components/myHooks/useCorrespondent';
import useMessages from './components/myHooks/useMessages';
import useFilteredMessages from './components/myHooks/useFilteredMessages';
import useGetLastId from './components/myHooks/useGetLastId';
import useBotAnswer from './components/myHooks/useBotAnswer';

import { ThemeProvider, createTheme } from '@mui/material/styles';
const theme = createTheme({
    palette: {
        primary: {
            main: '#527712',
        },
    },
});

export const AppContext = createContext(null);

function App() {
    const {contacts} = useContacts();
    const {correspondentId, changeCorrespondentIdCB} = useCorrespondent(contacts);

    const {msgState, dispatch, sendMessageCB} = useMessages();
    const {filteredMessages} = useFilteredMessages(correspondentId, msgState);

    const {getLastIdCB} = useGetLastId(msgState);
    useBotAnswer(msgState, correspondentId, getLastIdCB, dispatch);

    return (
        <AppContext.Provider value={{correspondentId, changeCorrespondentIdCB}}>
            <ThemeProvider theme={theme}>
                <div className="messenger-app">
                    <Contacts
                        contacts={contacts}/>
                    <Messages
                        messages={filteredMessages}/>
                    <Input
                        correspondentId={correspondentId}
                        sendMessageCB={sendMessageCB}
                        getLastIdCB={getLastIdCB}/>
                </div>
            </ThemeProvider>
        </AppContext.Provider>
    );
}

export default App;

