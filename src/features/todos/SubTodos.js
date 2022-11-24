import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Draggable } from '@hello-pangea/dnd';
import { deleteSubTodo, updateSubTodo, updateSubTodoDone } from './todosSlice';

import debounce from 'lodash.debounce';
import TextareaAutosize from 'react-textarea-autosize';

const SubTodos = (props) => {
    const index = props.index;
    const todo = props.todo;
    const { id, subText, done } = todo;

    console.log('sub', index);

    const [inputValue, setInputValue] = useState(subText); //updates your component state
    const [checked, setChecked] = useState(done);

    const dispatch = useDispatch();

    let baseSubTodo = {
        //obj being sent
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
        setChecked(!checked);
        baseSubTodo.done = !checked;
        dispatch(updateSubTodoDone(baseSubTodo));
    };

    const HandleDelete = () => {
        dispatch(deleteSubTodo(todo));
    };

    return (
        <div className='todoContainer'>
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
