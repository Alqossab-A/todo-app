import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import {
    deleteTodo,
    updateTodo,
    updateTodoComplete,
    updateTodoStatus,
} from './todosSlice';

import debounce from 'lodash.debounce';
import TextareaAutosize from 'react-textarea-autosize';

const Todos = (props) => {
    const index = props.index;
    const todo = props.todo;
    const { id, text, todoStatus, completed } = todo;

    const [inputValue, setInputValue] = useState(text); //updates your component state
    const [status, setStatus] = useState(todoStatus);
    const [checked, setChecked] = useState(completed);

    const dispatch = useDispatch();

    let baseTodo = {
        //obj being sent
        text: inputValue,
        todoStatus: status,
        completed: checked,
        id: id,
    };

    const debouncedDispatch = useMemo(
        () => debounce((obj) => dispatch(updateTodo(obj)), 750),
        [dispatch]
    );

    const handleChange = (e) => {
        setInputValue(e.target.value);
        baseTodo.text = e.target.value;
        debouncedDispatch(baseTodo);
    };

    const HandleStatusChange = (e) => {
        setStatus(e.target.value);
        baseTodo.todoStatus = e.target.value;
        dispatch(updateTodoStatus(baseTodo));
    };

    const HandleCompletion = () => {
        setChecked(!checked);
        baseTodo.completed = !checked;
        dispatch(updateTodoComplete(baseTodo));
    };

    const HandleDelete = () => {
        dispatch(deleteTodo(todo));
    };

    if (checked === false)
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

                <div className='todoInputs'>
                    <label>
                        <input
                            className='todoRadio'
                            type='radio'
                            name={`radio${id}`}
                            key={`todo${id}`}
                            value='todo'
                            checked={status === 'todo'}
                            onChange={HandleStatusChange}
                        />
                        <span className='todoSpan'>Todo</span>
                    </label>
                    <label>
                        <input
                            className='inProRadio'
                            type='radio'
                            name={`radio${id}`}
                            key={`inPro${id}`}
                            value='inPro'
                            checked={status === 'inPro'}
                            onChange={HandleStatusChange}
                        />
                        <span className='inProSpan'>In Progress</span>
                    </label>
                    <label>
                        <input
                            className='doneRadio'
                            type='radio'
                            name={`radio${id}`}
                            key={`done${id}`}
                            value='done'
                            checked={status === 'done'}
                            onChange={HandleStatusChange}
                        />
                        <span className='doneSpan'>Done</span>
                    </label>
                </div>
            </div>
        );
};

export default Todos;
