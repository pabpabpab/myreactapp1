import {useEffect, useState} from 'react';

// Фильтрованные сообщения (переписка с выбранным корреспондентом)
const useFilteredMessages = (correspondentId, allMessages, updateFlag) => {
    const [filteredMessages, setFilteredMessages] = useState([]);

    useEffect(
        () => {
            setFilteredMessages([]);
            if (allMessages?.size && correspondentId && allMessages.has(correspondentId)) {
                setFilteredMessages(allMessages.get(correspondentId));
            }
        },
        [correspondentId, allMessages, updateFlag]
    );

    return {
        filteredMessages,
    };
}

export default useFilteredMessages;