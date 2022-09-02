import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo } from './todosSlice';

const Todos = ({ todo }) => {
    const { text , id} = todo;

    const dispatch = useDispatch();

    return (
        <>
            <li key={id}>
                {text}{' '}
                <button
                    onClick={() => {
                        dispatch(deleteTodo(id));
                    }}
                >
                    -
                </button>
            </li>
        </>
    );
};

export default Todos;
