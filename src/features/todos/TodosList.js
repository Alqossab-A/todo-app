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
        return <Loading />;
    }

    if (errMsg) {
        return <Error errMsg={errMsg} />;
    }

    if (todos && todos.length > 0) {
        return (
            <>
                {todos.map((todo) => {
                    return (
                        <div key={todo.id}>
                            <Todos key={todo.id} todo={todo} />
                        </div>
                    );
                })}
            </>
        );
    }

    return <p>Enter a todo</p>;
};

export default TodosList;
