import { selectAllTodos, sortTodo, updateTodoPosition } from './todosSlice';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../../components/Loading';
import Todos from '../todos/Todos';
import Error from '../../components/Error';

const TodosList = () => {
    const dispatch = useDispatch();

    const todos = useSelector(selectAllTodos);

    const isLoading = useSelector((state) => state.todos.isLoading);
    const errMsg = useSelector((state) => state.todos.errMsg);

    const onDragEnd = async (result) => {
        const { destination, source } = result;

        if (!destination) return;

        if (destination.index === source.index) return;

        const toBeMoved = todos[source.index]
        const newOrder = [...todos]
        newOrder.splice(source.index, 1)
        newOrder.splice(destination.index, 0, toBeMoved)

        dispatch(updateTodoPosition(newOrder));
    };



    if (isLoading) {
        return <Loading />;
    }

    if (errMsg) {
        return <Error errMsg={errMsg} />;
    }

    if (todos && todos.length > 0) {
        return (
            <>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId='droppableArea'>
                        {(provided) => (
                            <div
                                className='TodoListContainer'
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {todos.map((todo, index) => {
                                    return (
                                        <Todos
                                            key={todo.id}
                                            todo={todo}
                                            index={index}
                                        />
                                    );
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </>
        );
    }

    return <p>Enter a todo</p>;
};

export default TodosList;
