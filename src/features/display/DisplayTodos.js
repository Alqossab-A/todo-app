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

    /*Example

    onDragEnd = result => {
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

    const column = this.state.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn,
      },
    };

    this.setState(newState);
  };*/

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
