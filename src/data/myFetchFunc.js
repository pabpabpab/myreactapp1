import startMessages from "./messagesFromServer";
import startContacts from "./contactsFromServer";

// функция имитация выборки данных с сервера
export default function myFetchFunc(url) {
    const data = url === 'messagesUrl' ? startMessages : startContacts;
    return new Promise((resolve) => {
        setTimeout(() => resolve(data),500); // имитация задержки ответа сервера
    });
};
