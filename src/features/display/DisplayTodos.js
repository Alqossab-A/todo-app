import TodoForm from '../todos/TodosForm';
import TodosList from '../todos/TodosList';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useDispatch } from 'react-redux';

const DisplayTodos = () => {
    const dispatch = useDispatch();

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

    };

    return (
        <>
            <h1>Todo's</h1>
            <TodoForm />
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId='Todoslist'>
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            <TodosList />
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    );
};

export default DisplayTodos;
