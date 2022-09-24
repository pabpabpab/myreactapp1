import React, {useEffect, useRef} from 'react';
import useInput from './myHooks/useInput';
import myData from '../data/myData';
import PropTypes from 'prop-types';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


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
            <TextField
                ref={inputRef}
                {...textInput.bind}
                id="outlined-basic"
                variant="outlined"
                sx={{
                    backgroundColor: '#fff',
                }}/>
            <Button
                type="submit"
                variant="contained"
                size="small">
                Send
            </Button>
        </form>
    );
}

Input.propTypes = {
    correspondentId: PropTypes.number.isRequired,
    sendMessageCB: PropTypes.func.isRequired,
    getLastIdCB: PropTypes.func.isRequired,
}

export default Input;