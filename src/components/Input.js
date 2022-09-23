import React, {useEffect, useRef} from 'react';
import useInput from './myHooks/useInput';
import myData from '../data/myData';

const Input = ({ correspondentId, sendMessageCB, getLastIdCB }) => {
    const inputRef = useRef(null);
    // пусть всегда фокус будет на text input
    useEffect(() => inputRef.current?.focus());

    // объект textInput
    const textInput = useInput('');

    // при нажатии на кнопку Send
    const doMessage = (e) => {
        e.preventDefault();
        const msg = {
            id: getLastIdCB() + 1,
            userId: myData.userId,
            toUserId: correspondentId,
            nick: myData.nick,
            text: textInput.value,
        };
        textInput.clear();
        sendMessageCB(msg);
    }

    return (
        <form onSubmit={doMessage} className="input">
            <input
                ref={inputRef}
                type="text"
                {...textInput.bind}
                className="input__text"/>
            <button
                type="submit"
                className="input__button">
                Send
            </button>
        </form>
    );
}

export default Input;