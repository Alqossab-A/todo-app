import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    deleteWeekly,
    updateWeekly,
} from './weeklySlice';

import debounce from 'lodash.debounce';
import TextareaAutosize from 'react-textarea-autosize';

const Weekly = (props) => {
    const weekly = props.weekly;
    const { id, text, done } = weekly;
    const dispatch = useDispatch();

    const [inputValue, setInputValue] = useState(text);
    const [checked, setChecked] = useState(weekly.done);

    //obj being sent
    let weeklyTask = {
        text: inputValue,
        done: checked,
        id: id,
    };

    const debouncedDispatch = useMemo(
        () => debounce((obj) => dispatch(updateWeekly(obj)), 750),
        [dispatch]
    );

    const handleChange = (e) => {
        setInputValue(e.target.value);
        weeklyTask.subText = e.target.value;
        debouncedDispatch(weeklyTask);
    };

    const HandleDelete = () => {
        dispatch(deleteWeekly(weeklyTask));
    };

    if (done === false)
        return (
            <div className='todoContainer' draggable>
                <TextareaAutosize
                    className='todoTextArea'
                    maxLength={100}
                    minRows={1}
                    type='text'
                    id={id}
                    value={inputValue}
                    onChange={handleChange}
                />
                <input
                    type='checkbox'
                    key={id}
                    name={`completed${id}`}
                    checked={false}
                    onChange={HandleDelete}
                />
            </div>
        );
};

export default Weekly;
