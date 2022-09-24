import myConst from './getConstants';

export default function msgReducer(state, action) {
    switch (action.type) {
        case myConst.SET_ALL:
            return {...state, messages: action.map }

        case myConst.ADD_ONE:
            const map = state.messages;
            const msg = action.message;
            const key = msg.toUserId;
            if (map.has(key)) {
                const oldValue = map.get(key);
                const newValue = [ ...oldValue, ...[msg] ];
                state.messages.set(key, newValue);
                return {...state};
            }
            return state;

        default: return state;
    }
};