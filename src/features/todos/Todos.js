import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo, updateTodos } from './todosSlice';

const Todos = (todo) => {
    const dispatch = useDispatch();

    return (
        <>
            <li key={todo.id}>
                <input
                    type='text'
                    id={todo.id}
                    value={todo.text}
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
