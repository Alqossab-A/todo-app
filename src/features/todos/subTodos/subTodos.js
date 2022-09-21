/*import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo, updateTodo } from './todosSlice';

const subTodos = (props) => {
    const subTodo = props.todo.subTodo;
    const { id, text } = subTodo;

    const [inputValue, setInputValue] = useState(text);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setInputValue(e.target.value); //updates your component state
        let obj = {
            id: id,
            text: e.target.value //adding to the obj to pass as an argument
        };
        dispatch(updateTodo(obj))
    };

    const HandleDelete = () => {
        dispatch(deleteTodo(subTodo));
    };

    return (
        <>
            <div key={id}>
                <input
                    type='text'
                    id={id}
                    value={inputValue}
                    onChange={handleChange}
                />
                <button onClick={HandleDelete}>-</button>
            </div>
        </>
    );
};

export default subTodos;*/