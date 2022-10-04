import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Draggable } from '@hello-pangea/dnd';
import {
    deleteTodo,
    updateTodo,
    updateTodoComplete,
    updateTodoStatus,
} from './todosSlice';
import debounce from 'lodash.debounce';
import TextareaAutosize from 'react-textarea-autosize';

const Todos = (props) => {
    const todo = props.todo;
    const { id, text, todoStatus, completed } = todo;

    const [inputValue, setInputValue] = useState(text);
    const [status, setStatus] = useState(todoStatus);
    const [checked, setChecked] = useState(completed);
    const dispatch = useDispatch();

    const debouncedDispatch = useMemo(
        () => debounce((obj) => dispatch(updateTodo(obj)), 750),
        [dispatch]
    );

    const handleChange = (e) => {
        setInputValue(e.target.value); //updates your component state
        let obj = {
            text: e.target.value,
            todoStatus: status,
            completed: checked,
            id: id,
        };
        debouncedDispatch(obj);
    };

    const HandleStatusChange = (e) => {
        setStatus(e.target.value);
        let statusObj = {
            text: inputValue,
            todoStatus: e.target.value,
            completed: checked,
            id: id,
        };
        dispatch(updateTodoStatus(statusObj));
    };

    const HandleCompletion = () => {
        setChecked(!checked);
        let checkedObj = {
            text: inputValue,
            todoStatus: status,
            completed: !checked,
            id: id,
        };
        dispatch(updateTodoComplete(checkedObj));
    };

    const HandleDelete = () => {
        dispatch(deleteTodo(todo));
    };

    return (
        <Draggable key={todo.id} draggableId='todo' index={props.index}>
            {(provided) => (
                <div
                    className='todoContainer'
                    index={props.index}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
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
                        value={inputValue}
                        onChange={handleChange}
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
                                onChange={HandleStatusChange}
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
                                onChange={HandleStatusChange}
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
                                onChange={HandleStatusChange}
                            />
                            <span className='doneSpan'>Done</span>
                        </label>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default Todos;
