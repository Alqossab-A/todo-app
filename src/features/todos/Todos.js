import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo, updateTodo } from './todosSlice';

const Todos = (props) => {
    const todo = props.todo;
    const { id, text } = todo;

    const [inputValue, setInputValue] = useState(text);
    const dispatch = useDispatch();

    const HandleKeyPress = (e) => {
        if (e.key === 'Enter') {
            console.log('HandleKeyPress:', inputValue, id);
            dispatch(updateTodo({ payload: inputValue, id: id }));
        }
    };

    const HandleOnChange = (e) => {
        setInputValue(e.target.value);
    };

    const HandleDelete = () => {
        dispatch(deleteTodo(todo));
    };

    return (
        <>
            <div key={id}>
                <input
                    type='text'
                    id={id}
                    value={inputValue}
                    onChange={HandleOnChange}
                    onKeyPress={HandleKeyPress}
                />
                <button onClick={HandleDelete}>-</button>
            </div>
        </>
    );
};

export default Todos;
