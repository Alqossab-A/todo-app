import { useSelector } from 'react-redux';
import { selectAllTodos } from '../todos/todosSlice';
import ArchivedTodo from './ArchivedTodo';
import ArchivedSubTodo from './ArchivedSubTodo';
import { useState } from 'react';

const History = () => {
    // const todos = useSelector(selectAllTodos);

    // const [show, setShow] = useState(false);

    // return (
    //     <>
    //         <button onClick={() => setShow(!show)}>history</button>
    //         <div className='HistoryTodo'>
    //             {show? todos
    //                 .filter((todo) => todo.completed === true)
    //                 .map((todo) => {
    //                     return <ArchivedTodo key={todo.id} todo={todo} />;
    //                 }): null}
    //         </div>

    //         <div className='HistorySubTodo'>
    //             {show? todos
    //                 .filter((todo) => todo.done === true)
    //                 .map((todo) => {
    //                     return <ArchivedSubTodo key={todo.id} todo={todo} />;
    //                 }): null}
    //         </div>
    //     </>
    // );
};

export default History;
