import TodoForm from '../todos/TodosForm';
import TodosList from '../todos/TodosList';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';

const DisplayTodos = () => {
    const onDragEnd = (result) => {
        ///TODO: reoder our Todolist
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
