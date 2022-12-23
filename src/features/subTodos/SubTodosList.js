import { useDispatch, useSelector } from 'react-redux';
import React, { useMemo } from 'react';
import { updateSubTodosPosition } from './subTodosSlice';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';

import Loading from '../../components/Loading';
import Error from '../../components/Error';
import SubTodos from './SubTodos';
import SubTodoForm from './SubTodosForm';

const SubTodosList = () => {
    const dispatch = useDispatch();

    const subTodos = useSelector((state) => state.subTodos.subTodosArray);
    const memoizedSubTodos = useMemo(() => subTodos, [subTodos]);

    const isLoading = useSelector((state) => state.todos.isLoading);
    const errMsg = useSelector((state) => state.todos.errMsg);

    const handleOnDragEnd = (result) => {
        // Check if the item was dropped in a new position
        if (result.destination) {
            // Use the `splice` method to remove the item from its original position
            const updatedSubTodos = [...subTodos];
            updatedSubTodos.splice(result.source.index, 1);

            // Use the `splice` method to insert the item at its new position
            updatedSubTodos.splice(
                result.destination.index,
                0,
                subTodos[result.source.index]
            );

            // Dispatch an action to update the list of subtodos in the redux store
            dispatch(updateSubTodosPosition(updatedSubTodos));
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    if (errMsg) {
        return <Error errMsg={errMsg} />;
    }

    if (memoizedSubTodos && memoizedSubTodos.length >= 0) {
        return (
            <>
                <div className='subTodoForm'>
                {memoizedSubTodos.length >= 5? null : <SubTodoForm />}
                </div>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId='subTodosList'>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {memoizedSubTodos.map((subTodo, index) => (
                                    <Draggable
                                        key={subTodo.id}
                                        draggableId={String(subTodo.id)}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <SubTodos
                                                    key={index}
                                                    subTodo={subTodo}
                                                    index={index}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
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

export default SubTodosList;
