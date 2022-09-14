import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo, updateTodos } from './todosSlice';

const Todos = (props) => {
    const todo = props.todo;

    const [inputValue, setInputValue] = useState(todo.text);
    const dispatch = useDispatch();

    return (
        <>
            <li key={todo.id}>
                <input
                    type='text'
                    id={todo.id}
                    value={inputValue}
                    onChange={(e) => {
                        dispatch(updateTodos(setInputValue(e.target.value, todo.id)));
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
