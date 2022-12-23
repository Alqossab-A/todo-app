import { useDispatch, useSelector } from 'react-redux';
import React, { useMemo } from 'react';

import Loading from '../../components/Loading';
import Todos from '../todos/Todos';
import Error from '../../components/Error';
import TodoForm from './TodosForm';

const TodosList = () => {
    // const dispatch = useDispatch();

    const todos = useSelector(state => state.todos.todosArray);
    const memoizedTodos = useMemo(() => todos, [todos]);

    const isLoading = useSelector((state) => state.todos.isLoading);
    const errMsg = useSelector((state) => state.todos.errMsg);

    if (isLoading) {
        return <Loading />;
    }

    if (errMsg) {
        return <Error errMsg={errMsg} />;
    }

    if (memoizedTodos && memoizedTodos.length >= 0) {
        return (
            <>
                <div className='todoForm'>
                {memoizedTodos.length >= 4? null : <TodoForm />}
                </div>
                <div className='TodoListContainer'>
                    {memoizedTodos.map((todo, index) => {
                        return <Todos key={index} todo={todo} index={index} />;
                    })}
                </div>
            </>
        );
    }

    return <p>Enter a todo</p>;
};

export default TodosList;
