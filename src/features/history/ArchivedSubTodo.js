import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteSubTodo, fetchTodos, updateSubTodoDone } from '../todos/todosSlice';

import TextareaAutosize from 'react-textarea-autosize';

const ArchivedSubTodo = (props) => {
    // const todo = props.todo;
    // const { id, subText, done } = todo;

    // const [checked, setChecked] = useState(done);

    // const dispatch = useDispatch();

    // let baseSubTodo = { //obj being sent
    //     subText: subText,
    //     done: checked,
    //     id: id,
    // };

    // const HandleCompletion = () => {
    //     setChecked(!checked);
    //     baseSubTodo.done = !checked;
    //     dispatch(updateSubTodoDone(baseSubTodo));
    //     fetchTodos()
    // };

    // const HandleDelete = () => {
    //     dispatch(deleteSubTodo(todo));
    // };

    // if (checked === true)
    //     return (
    //         <div className='todoContainer'>
    //             <input
    //                 type='checkbox'
    //                 key={id}
    //                 name={`completed${id}`}
    //                 checked={checked}
    //                 onChange={HandleCompletion}
    //             />
    //             <TextareaAutosize
    //                 className='todoTextArea'
    //                 maxLength={100}
    //                 minRows={1}
    //                 type='text'
    //                 id={id}
    //                 value={subText}
    //             />
    //             <button onClick={HandleDelete}>-</button>
    //         </div>
    //     );
};

export default ArchivedSubTodo;
