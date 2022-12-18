import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateTodoComplete, deleteTodo } from '../todos/todosSlice';

import TextareaAutosize from 'react-textarea-autosize';

const ArchivedTodo = (props) => {
    const todo = props.todo;
    const { id, text, todoStatus, completed } = todo;

    const [status, setStatus] = useState(todoStatus);
    const [checked, setChecked] = useState(completed);

    const dispatch = useDispatch();

    // This effect will run whenever the `todo` prop changes
    useEffect(() => {
        setChecked(todo.completed);
    }, [todo]);

    //obj being sent
    let baseTodo = {
        text: text,
        todoStatus: status,
        completed: checked,  
        id: id,
    };

    const HandleCompletion = () => {
        setChecked(!checked);
        baseTodo.completed = !checked;
        dispatch(updateTodoComplete(baseTodo));
    };

    const HandleDelete = () => {
        dispatch(deleteTodo(todo));
    };

    if (checked === true)
        return (
            <div className='todoContainer'>
                <input
                    type='checkbox'
                    key={id}
                    name={`completed${id}`}
                    checked={checked}
                    onChange={HandleCompletion}
                />
                <TextareaAutosize
                    className='todoTextArea'
                    maxLength={100}
                    minRows={1}
                    type='text'
                    id={id}
                    value={text}
                />
                <button onClick={HandleDelete}>-</button>

                <div className='todoInputs'>
                    <label>
                        <input
                            className='todoRadio'
                            type='radio'
                            name={`radio${id}`}
                            key={`todo${id}`}
                            value='todo'
                            checked={status === 'todo'}
                        />
                        <span className='todoSpan'>Todo</span>
                    </label>
                    <label>
                        <input
                            className='inProRadio'
                            type='radio'
                            name={`radio${id}`}
                            key={`inPro${id}`}
                            value='inPro'
                            checked={status === 'inPro'}
                        />
                        <span className='inProSpan'>In Progress</span>
                    </label>
                    <label>
                        <input
                            className='doneRadio'
                            type='radio'
                            name={`radio${id}`}
                            key={`done${id}`}
                            value='done'
                            checked={status === 'done'}
                        />
                        <span className='doneSpan'>Done</span>
                    </label>
                </div>
            </div>
        );
};

export default ArchivedTodo;
