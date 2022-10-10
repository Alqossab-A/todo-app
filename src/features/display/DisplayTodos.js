import TodoForm from '../todos/TodosForm';
import TodosList from '../todos/TodosList';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { selectAllTodos } from '../todos/todosSlice';

const DisplayTodos = () => {
    const dispatch = useDispatch();

    const [todos, updateTodos] = useState(useSelector(selectAllTodos));

    const onDragEnd = (result) => {
        console.log(result);
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

        if (!result.destination) return;

        dispatch(moveTodo(result.source.index, result.destination.index));;
    };

    return (
        <>
            <h1>Todo's</h1>
            <TodoForm />
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId='Todoslist'>
                    {(provided) => (
                        <div
                            className='TodoListContainer'
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
