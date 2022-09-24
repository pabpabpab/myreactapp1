import {useEffect} from 'react';
import myConst from '../functions/getConstants';

const useBotAnswer = (msgState, correspondentId, getLastIdCB, dispatch) => {
    useEffect(
        () => {
            if (!correspondentId) {
                return undefined;
            }

            if (!msgState?.lastAction) {
                return undefined;
            }

            if (!msgState?.messages) {
                return undefined;
            }

            const map = msgState.messages;
            if (!map.has(correspondentId)) {
                return undefined;
            }

            const currentMessages = map.get(correspondentId);
            if (!currentMessages.length) {
                return undefined;
            }

            const lastMsg = currentMessages[currentMessages.length - 1];
            if (lastMsg.userId === 0) {
                return undefined;
            }

            const botMsg = {
                id: getLastIdCB() + 1,
                userId: 0,
                toUserId: correspondentId,
                nick: 'Bot',
                text: `Сообщение ${lastMsg.nick} отправлено`,
            }

            setTimeout(() => {
                dispatch({ type: myConst.ADD_ONE, message: botMsg });
            }, 2000);
        },
        [msgState],
    );

}

export default useBotAnswer;

