import { useSelector } from 'react-redux';
import React from 'react';
import Loading from '../../components/Loading';
import Todos from './Todos';
import Error from '../../components/Error';
import TodoForm from './TodosForm';

const TodosList = () => {
    const todos = useSelector((state) => state.todos.todosArray);

    const isLoading = useSelector((state) => state.todos.isLoading);
    const errMsg = useSelector((state) => state.todos.errMsg);

    if (isLoading) {
        return <Loading />;
    }

    if (errMsg) {
        return <Error errMsg={errMsg} />;
    }

    if (todos && todos.length >= 0) {
        return (
            <section>
                <div>
                    {todos.map((todo, index) => {
                        return <Todos key={todo._id} todo={todo} index={index} />;
                    })}
                </div>

                <div>
                    {todos.length >= 4 ? null : <TodoForm />}
                </div>
            </section>
        );
    }

    return <p>Enter a todo</p>;
};

export default TodosList;
