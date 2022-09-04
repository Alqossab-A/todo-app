import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo } from './todosSlice';

const Todos = ({ todo }) => {
    const { text: todoText , id} = todo;

    const dispatch = useDispatch();

    return (
        <>
            <li key={id}>
                {todoText}{' '}
                <button
                    onClick={() => {
                        dispatch(deleteTodo(id));
                    }}
                >
                    -
                </button>
                <button>+</button>
            </li>
        </>
    );
};

export default Todos;
