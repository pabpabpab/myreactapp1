import {useEffect, useState} from 'react';

// Фильтрованные сообщения (переписка с выбранным корреспондентом)
const useFilteredMessages2 = (correspondentId, msgState) => {
    const [filteredMessages, setFilteredMessages] = useState([]);

    useEffect(
        () => {
            setFilteredMessages([]);
            const map = msgState?.messages;
            if (map?.size && correspondentId && map.has(correspondentId)) {
                setFilteredMessages(map.get(correspondentId));
            }
        },
        [correspondentId, msgState]
    );

    return {
        filteredMessages,
    };
}

export default useFilteredMessages2;