import React, { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';
import TextareaAutosize from 'react-textarea-autosize';
import { useDispatch } from 'react-redux';
import { deleteTodo, updateTodo } from './todosSlice';

const Todos = (props) => {
    const todo = props.todo;
    const { id, text } = todo;

    const [inputValue, setInputValue] = useState(text);
    const dispatch = useDispatch();

    const debouncedDispatch = useCallback(
        debounce((obj) => dispatch(updateTodo(obj)), 850),
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
                {/*<button onClick={HandleSubTodo}>+</button>*/}
            </div>
        </>
    );
};

export default Todos;
