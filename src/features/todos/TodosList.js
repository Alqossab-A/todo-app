import { useSelector } from 'react-redux';
import { selectAllTodos } from './todosSlice';
import Loading from '../../components/Loading';
import Todos from '../todos/Todos';
import Error from '../../components/Error';

const TodosList = () => {
    const todos = useSelector(selectAllTodos);

    const isLoading = useSelector((state) => state.todos.isLoading);
    const errMsg = useSelector((state) => state.todos.errMsg);

    if (isLoading) {
        return <Loading />;
    }

    if (errMsg) {
        return <Error errMsg={errMsg} />;
    }

    if (todos && todos.length > 0) {
        return (
            <>
                {todos.map((todo, index) => {
                    return <Todos key={todo.id} todo={todo} index={index} />;
                })}
            </>
        );
    }

    return <p>Enter a todo</p>;
};

export default TodosList;
