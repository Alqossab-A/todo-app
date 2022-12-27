import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { updateWeekly } from './weeklySlice';

import debounce from 'lodash.debounce';
import TextareaAutosize from 'react-textarea-autosize';

const Weekly = (props) => {
    const weekly = props.weekly;
    const { id, text } = weekly;
    const dispatch = useDispatch();

    const [inputValue, setInputValue] = useState(text);

    //obj being sent
    let weeklyTask = {
        text: inputValue,
        id: id,
    };

    const debouncedDispatch = useMemo(
        () => debounce((obj) => dispatch(updateWeekly(obj)), 750),
        [dispatch]
    );

    const handleChange = (e) => {
        setInputValue(e.target.value);
        weeklyTask.text = e.target.value;
        debouncedDispatch(weeklyTask);
    };

    const HandleDelete = () => {
        setInputValue('');
        weeklyTask.text = '';
        debouncedDispatch(weeklyTask);
    };

    return (
        <div className='todoContainer' draggable>
            <input
                type='checkbox'
                key={id}
                name={`completed${id}`}
                checked={false}
                onChange={HandleDelete}
            />
            <TextareaAutosize
                className='todoTextArea'
                maxLength={100}
                minRows={1}
                type='text'
                id={id}
                value={inputValue}
                placeholder='Enter weekly'
                onChange={handleChange}
            />
        </div>
    );
};

export default Weekly;
