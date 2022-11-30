import { selectAllTodos } from './todosSlice';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';

import Loading from '../../components/Loading';
import Todos from '../todos/Todos';
import Error from '../../components/Error';
import SubTodos from './SubTodos';
import TodoForm from './TodosForm';
import SubTodoForm from './SubTodosForm';
import ArchivedTodo from '../history/ArchivedTodo';
import ArchivedSubTodo from '../history/ArchivedSubTodo';

const TodosList = () => {
    const dispatch = useDispatch();

    const todos = useSelector(selectAllTodos);

    const [show, setShow] = useState(false);

    const isLoading = useSelector((state) => state.todos.isLoading);
    const errMsg = useSelector((state) => state.todos.errMsg);

    const onDragStart = (e , index) => {
        console.log('drag started', index)
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
                    {todos
                        .filter((todo) => todo.text)
                        .map((todo, index) => {
                            return (
                                <Todos
                                    key={index}
                                    todo={todo}
                                    index={index}
                                />
                            );
                        })}
                </div>

                <SubTodoForm />
                <div className='SubTodoListContainer'>
                    {todos
                        .filter((todo) => todo.subText)
                        .map((todo, index) => {
                            return (
                                <SubTodos
                                    key={index}
                                    todo={todo}
                                    index={index}
                                />
                            );
                        })}
                </div>

                {/*History*/}
                <button onClick={() => setShow(!show)}>history</button>
            <div className='HistoryTodo'>
                {show? todos
                    .filter((todo) => todo.completed === true)
                    .map((todo) => {
                        return <ArchivedTodo key={todo.id} todo={todo} />;
                    }): null}
            </div>

            <div className='HistorySubTodo'>
                {show? todos
                    .filter((todo) => todo.done === true)
                    .map((todo) => {
                        return <ArchivedSubTodo key={todo.id} todo={todo} />;
                    }): null}
            </div>
            </>
        );
    }

    return <p>Enter a todo</p>;
};

export default TodosList;
