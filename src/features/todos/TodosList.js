import { useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import Todos from '../todos/Todos';
import Error from '../../components/Error';
import { selectAllTodos } from './todosSlice';

const TodosList = () => {
    const todos = useSelector(selectAllTodos);

    const isLoading = useSelector((state) => state.todos.isLoading);
    const errMsg = useSelector((state) => state.todos.errMsg);

    if (isLoading) {
        return (
            <Loading />
        );
    }

    if (errMsg) {
        return (
            <Error errMsg={errMsg} />
        );
    }

    return (
        <>
        {todos.map((todo) => {
            return (
                <Todos key={todo.id} todo={todo} />
            )
        })}
        </>
    );
};

export default TodosList;