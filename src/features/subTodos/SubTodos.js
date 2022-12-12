import React, { useState, useMemo } from 'react';
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

    const [inputValue, setInputValue] = useState(subText); //updates your component state
    const [checked, setChecked] = useState(subTodo.done);

    const dispatch = useDispatch();

    let baseSubTodo; // Declare baseSubTodo variable

    // Initialize baseSubTodo object only if it has not been initialized already and if id, inputValue, and checked are defined and valid
    if (!baseSubTodo && id && inputValue && typeof checked === 'boolean') {
        baseSubTodo = {
            //obj being sent
            subText: inputValue,
            done: checked,
            id: id,
        };
    }

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
        baseSubTodo.done = !done;
        console.log('HandleCompletion baseSubTodo:', baseSubTodo); // Log updated to-do item
        dispatch(updateSubTodoDone(baseSubTodo));
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
