import {useCallback} from 'react';

const useGetLastId = (msgState) => {
    const getLastIdCB = useCallback(() => {
        const map = msgState.messages;

        if (!map.size) {
            return 0;
        }

        let allMsg = [];
        for (let value of map.values()) {
            allMsg = [ ...allMsg, ...value ];
        }

        let objWithMaxId = allMsg.reduce(function(prev, cur) {
            return cur.id > prev.id ? cur : prev;
        },  {id: -1});

        return objWithMaxId.id;

    }, [msgState]);

    return {
        getLastIdCB,
    };
}

export default useGetLastId;