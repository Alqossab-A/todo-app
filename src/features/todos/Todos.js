import React, { useState, useMemo } from 'react';
import debounce from 'lodash.debounce';
import TextareaAutosize from 'react-textarea-autosize';
import { useDispatch } from 'react-redux';
import { deleteTodo, updateTodo } from './todosSlice';

const Todos = (props) => {
    const todo = props.todo;
    const { id, text } = todo;

    const [inputValue, setInputValue] = useState(text);
    const dispatch = useDispatch();

    const debouncedDispatch = useMemo(
        () => debounce((obj) => dispatch(updateTodo(obj)), 750),
        [dispatch]
    );

    const handleChange = (e) => {
        setInputValue(e.target.value); //updates your component state
        let obj = {
            id: id,
            text: e.target.value, //adding to the obj to pass as an argument
        };
        debouncedDispatch(obj);
    };

    const HandleDelete = () => {
        dispatch(deleteTodo(todo));
    };

    return (
        <>
            <div key={id}>
                <input type='checkbox' key={id} />
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
            <label>
                <input type='radio' name='options' />
                <span>Todo</span>
            </label>
            <label>
                <input type='radio' name='options' />
                <span>In Progress</span>
            </label>
            <label>
                <input type='radio' name='options' />
                <span>Done</span>
            </label>
        </>
    );
};

export default Todos;
