import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo, updateTodo } from './todosSlice';

const Todos = (props) => {
    const todo = props.todo;
    const { id, text } = todo;

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
        dispatch(deleteTodo(todo));
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

export default Todos;
