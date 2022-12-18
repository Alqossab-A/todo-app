import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    deleteSubTodo,
    updateSubTodo,
    updateSubTodoDone,
} from './subTodosSlice';

import debounce from 'lodash.debounce';
import TextareaAutosize from 'react-textarea-autosize';

const SubTodos = (props) => {
    const index = props.index;
    const subTodo = props.subTodo;
    const { id, subText, done } = subTodo;
    const dispatch = useDispatch();

    const [inputValue, setInputValue] = useState(subText);
    const [checked, setChecked] = useState(subTodo.done);

    // Whenever the 'done' property of the todo item changes, re-render the checkbox
    useEffect(() => {
        setChecked(done);
    }, [done]);

    //obj being sent
    let baseSubTodo = {
        subText: inputValue,
        done: checked,
        id: id,
    };

    const debouncedDispatch = useMemo(
        () => debounce((obj) => dispatch(updateSubTodo(obj)), 750),
        [dispatch]
    );

    const handleChange = (e) => {
        setInputValue(e.target.value);
        baseSubTodo.subText = e.target.value;
        debouncedDispatch(baseSubTodo);
    };

    const HandleCompletion = () => {
        setChecked(!done);
        // obj created to add dateToDelete
        let obj = {
            subText: inputValue,
            done: !done,
            id: id,
            dateToDelete: Date.now() +  60 * 1000, // 3 days from the time it is sent
        };
        dispatch(updateSubTodoDone(obj));
    };

    const HandleDelete = () => {
        dispatch(deleteSubTodo(subTodo));
    };

    if (done === false)
        return (
            <div className='todoContainer' draggable>
                <input
                    type='checkbox'
                    key={id}
                    name={`completed${id}`}
                    checked={checked}
                    onChange={HandleCompletion}
                />
                <TextareaAutosize
                    className='todoTextArea'
                    maxLength={100}
                    minRows={1}
                    type='text'
                    id={id}
                    value={inputValue}
                    onChange={handleChange}
                />
                <button onClick={HandleDelete}>-</button>
            </div>
        );
};

export default SubTodos;
