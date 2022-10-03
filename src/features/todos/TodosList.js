import { useSelector } from 'react-redux';
import { selectAllTodos } from './todosSlice';
import { Droppable } from 'react-beautiful-dnd';
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
            <Droppable droppableId='Todos'>
                {(provided) => (
                    <div
                        innerRef={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {todos.map((todo, index) => {
                            return (
                                <div key={todo.id} index={index} >
                                    <Todos key={todo.id} todo={todo} />
                                </div>
                            );
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        );
    }

    return <p>Enter a todo</p>;
};

export default TodosList;
