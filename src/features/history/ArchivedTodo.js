import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateTodoComplete, deleteTodo } from '../todos/todosSlice';
import useDaysLeft from '../../utils/useDaysLeft';

import TextareaAutosize from 'react-textarea-autosize';

const ArchivedTodo = (props) => {
    const todo = props.todo;
    const { id, text, todoStatus, completed, dateToDelete } = todo;

    const [checked, setChecked] = useState(completed);
    const daysLeft = useDaysLeft(dateToDelete);

    const dispatch = useDispatch();

    // This effect will run whenever the `todo` prop changes
    useEffect(() => {
        setChecked(todo.completed);
    }, [todo]);

    //obj being sent
    let baseTodo = {
        text: text,
        todoStatus: todoStatus,
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
                        <span className='todoSpan'>Todo</span>
                    </label>
                    <label>
                        <span className='inProSpan'>In Progress</span>
                    </label>
                    <label>
                        <span className='doneSpan'>Done</span>
                    </label>
                </div>
                <span className='historyCountdown'>~{daysLeft} days left</span>
            </div>
        );
};

export default ArchivedTodo;
