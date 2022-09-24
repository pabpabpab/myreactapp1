import {useState} from 'react';

const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    const onChange = (event) => {
        setValue(event.target.value);
    }

    const clear = () => setValue('');

    return {
        bind: { value, onChange },
        value,
        clear,
    }
}

export default useInput;