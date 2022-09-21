import React, {useEffect, useRef} from 'react';
import useInput from './myHooks/useInput';
import getMsgId from '../data/getMsgId';
import myData from '../data/myData';

const Input = ({ correspondentId, sendMessageCB }) => {
    const inputRef = useRef(null);
    // пусть всегда фокус будет на text input
    useEffect(() => inputRef.current.focus());

    // объект textInput 
    const textInput = useInput('');

    // при нажатии на кнопку Send
    const doMessage = () => {
        const msg = {
            id: getMsgId(),
            userId: myData.userId,
            toUserId: correspondentId,
            nick: myData.nick,
            text: textInput.value,
        };
        textInput.clear();
        sendMessageCB(msg);
    }

    return (
        <div className="input">
            <input
                ref={inputRef}
                type="text"
                { ...textInput.bind }
                className="input__text"/>
            <button
                onClick={doMessage}
                className="input__button">
                Send
            </button>
        </div>
    );
}

export default Input;