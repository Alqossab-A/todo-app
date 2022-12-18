import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteSubTodo, updateSubTodoDone } from '../subTodos/subTodosSlice';
import TextareaAutosize from 'react-textarea-autosize';

const ArchivedSubTodo = (props) => {
    const subTodo = props.subTodo;
    const { id, subText, done } = subTodo;

    const [checked, setChecked] = useState(done);

    const dispatch = useDispatch();

    // This effect will run whenever the `subTodo` prop changes
    useEffect(() => {
        setChecked(subTodo.done);
    }, [subTodo]);

    //obj being sent
    let baseSubTodo = {
        subText: subText,
        done: checked,
        id: id,
    };

    const HandleCompletion = () => {
        setChecked(!done);
        baseSubTodo.done = !done;
        dispatch(updateSubTodoDone(baseSubTodo));
    };

    const HandleDelete = () => {
        dispatch(deleteSubTodo(subTodo));
    };

    if (done === true)
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
                    value={subText}
                />
                <button onClick={HandleDelete}>-</button>
            </div>
        );
};

export default ArchivedSubTodo;
