import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/*
// =================================== Сообщения =====================================
    // allMessages - имитация сообщений с сервера
    const [allMessages, setAllMessages] = useState(startMessages);
    // это сообщения в отдельном чате - переписка с выбранным корреспондентом
    const [filteredMessages, setFilteredMessages] = useState([]);
    // получать все сообщения и выводить на экран отфильтрованные (переписка с выбранным корреспондентом)
    useEffect(
        () => {
            myFetchFunc('messagesUrl').then(receivedMessages => {
                const filtered = filterMessages(receivedMessages, correspondentId, myData.userId);
                setFilteredMessages(filtered);
            });
        },
        [correspondentId, allMessages],
    );

    // это колбэк, который отправим в компонент Input
    // он добавляет новое сообщение из Input к сообщениям с сервера
    const sendMessageCB = useCallback((msg) => {
        setAllMessages([ ...allMessages, ...[msg] ]);
    });
    // =================================== /Сообщения =====================================


    const myFetchFunc = (url) => {
        const data = url === 'messagesUrl' ? allMessages : startContacts;
        return new Promise((resolve) => {
            setTimeout(() => resolve(data),300); // имитация задержки ответа сервера
        });
    };
 */
