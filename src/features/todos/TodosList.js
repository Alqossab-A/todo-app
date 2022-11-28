import { selectAllTodos } from './todosSlice';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../../components/Loading';
import Todos from '../todos/Todos';
import Error from '../../components/Error';
import SubTodos from './SubTodos';
import TodoForm from './TodosForm';
import SubTodoForm from './SubTodosForm';

const TodosList = () => {
    const dispatch = useDispatch();

    const todos = useSelector(selectAllTodos);

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
            <>
                <TodoForm />
                <div className='TodoListContainer'>
                    {todos
                        .filter((todo) => todo.text)
                        .map((todo, index) => {
                            return (
                                <Todos
                                    key={todo.id}
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
                                    key={todo.id}
                                    todo={todo}
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

export default TodosList;
