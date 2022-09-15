import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo, updateTodo } from './todosSlice';

const Todos = (props) => {
    const todo = props.todo;
    const {id, text} = todo

    const [inputValue, setInputValue] = useState(text);
    const dispatch = useDispatch();

    return (
        <>
            <li key={id}>
                <input
                    type='text'
                    id={id}
                    value={inputValue}
                    onChange={(e) => {
                        dispatch(updateTodo(setInputValue(e.target.value), id));
                    }}
                />
                <button
                    onClick={() => {
                        dispatch(deleteTodo(props.todo));
                    }}
                >
                    -
                </button>
            </li>
        </>
    );
};

export default Todos;
