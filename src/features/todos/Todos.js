import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo, updateTodos } from './todosSlice';

const Todos = ({ todo }) => {
    const { id, text } = todo;

    const dispatch = useDispatch();

    return (
        <>
            <li key={id}>
                <input
                    type='text'
                    id={id}
                    value={text}
                    onChange={() => {
                        dispatch(updateTodos(todo));
                    }}
                />
                <button
                    onClick={() => {
                        dispatch(deleteTodo(todo));
                    }}
                >
                    -
                </button>
            </li>
        </>
    );
};

export default Todos;
