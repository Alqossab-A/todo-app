import React, { useState, useMemo } from 'react';
import debounce from 'lodash.debounce';
import TextareaAutosize from 'react-textarea-autosize';
import { useDispatch } from 'react-redux';
import {
    deleteTodo,
    updateTodo,
    updateTodoComplete,
    updateTodoStatus,
} from './todosSlice';

const Todos = (props) => {
    const todo = props.todo;
    const { id, text, todoStatus, completed } = todo;

    const [inputValue, setInputValue] = useState(text);
    const [status, setStatus] = useState(todoStatus);
    const [checked, setChecked] = useState(completed);
    const dispatch = useDispatch();

    const debouncedDispatch = useMemo(
        () => debounce((obj) => dispatch(updateTodo(obj)), 750),
        [dispatch]
    );

    const handleChange = (e) => {
        setInputValue(e.target.value); //updates your component state
        let obj = {
            id: id,
            text: e.target.value,
            todoStatus: status,
            completed: checked,
        };
        debouncedDispatch(obj);
    };

    const HandleStatusChange = (e) => {
        setStatus(e.target.value);
        let statusObj = {
            id: id,
            text: inputValue,
            todoStatus: e.target.value,
            completed: checked,
        };
        dispatch(updateTodoStatus(statusObj));
    };

    const HandleCompletion = () => {
        setChecked(!checked);
        let checkedObj = {
            id: id,
            text: inputValue,
            todoStatus: status,
            completed: !checked,
        };
        dispatch(updateTodoComplete(checkedObj));
    };

    const HandleDelete = () => {
        dispatch(deleteTodo(todo));
    };

    return (
        <>
            <div key={id}>
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
            <div>
                <label>
                    <input
                        type='radio'
                        name={`radio${id}`}
                        key={`todo${id}`}
                        value='todo'
                        checked={status === 'todo'}
                        onChange={HandleStatusChange}
                    />
                    <span>Todo</span>
                </label>
                <label>
                    <input
                        type='radio'
                        name={`radio${id}`}
                        key={`inPro${id}`}
                        value='inPro'
                        checked={status === 'inPro'}
                        onChange={HandleStatusChange}
                    />
                    <span>In Progress</span>
                </label>
                <label>
                    <input
                        type='radio'
                        name={`radio${id}`}
                        key={`done${id}`}
                        value='done'
                        checked={status === 'done'}
                        onChange={HandleStatusChange}
                    />
                    <span>Done</span>
                </label>
            </div>
        </>
    );
};

export default Todos;
