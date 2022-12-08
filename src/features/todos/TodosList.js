import { useDispatch, useSelector } from 'react-redux';
import React from 'react';

import Loading from '../../components/Loading';
import Todos from '../todos/Todos';
import Error from '../../components/Error';
import TodoForm from './TodosForm';

const TodosList = () => {
    const dispatch = useDispatch();

    const todos = useSelector(state => state.todos.todosArray);

    const isLoading = useSelector((state) => state.todos.isLoading);
    const errMsg = useSelector((state) => state.todos.errMsg);

    const onDragStart = (e, index) => {
        console.log('drag started', index);
    };

    if (isLoading) {
        return <Loading />;
    }

    if (errMsg) {
        return <Error errMsg={errMsg} />;
    }

    if (todos && todos.length >= 0) {
        return (
            <>
                <TodoForm />
                <div className='TodoListContainer'>
                    {todos.map((todo, index) => {
                        return <Todos key={index} todo={todo} index={index} />;
                    })}
                </div>
            </>
        );
    }

    return <p>Enter a todo</p>;
};

export default TodosList;
