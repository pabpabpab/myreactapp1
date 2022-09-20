import React, {useState, useEffect, useRef} from 'react';
import getMsgId from '../data/getMsgId';
import myData from '../data/myData';

const Input = ({ correspondentId, sendMessageCB }) => {
    const inputRef = useRef(null);
    // пусть всегда фокус будет на text input
    useEffect(() => inputRef.current.focus());

    // значение text input
    const [inputValue, setInputValue] = useState('');

    // при нажатии на кнопку Send
    const doMessage = () => {
        const msg = {
            id: getMsgId(),
            userId: myData.userId,
            toUserId: correspondentId,
            nick: myData.nick,
            text: inputValue,
        };
        setInputValue('');
        sendMessageCB(msg);
    }

    return (
        <div className="input">
            <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
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