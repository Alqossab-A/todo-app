import { useDispatch, useSelector } from 'react-redux';
import React, { useMemo }from 'react';

import Loading from '../../components/Loading';
import Error from '../../components/Error';
import SubTodos from './SubTodos';
import SubTodoForm from './SubTodosForm';

const SubTodosList = () => {
    const dispatch = useDispatch();

    const subTodos = useSelector(state => state.subTodos.subTodosArray);
    const memoizedSubTodos = useMemo(() => subTodos, [subTodos]);

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

    if (memoizedSubTodos && memoizedSubTodos.length >= 0) {
        return (
            <>
                <SubTodoForm />
                <div className='SubTodoListContainer'>
                    {memoizedSubTodos.map((subTodo, index) => {
                        return (
                            <SubTodos
                                key={index}
                                subTodo={subTodo}
                                index={index}
                            />
                        );
                    })}
                </div>
            </>
        );
    }

    return <p>Enter a todo</p>;
};

export default SubTodosList;
