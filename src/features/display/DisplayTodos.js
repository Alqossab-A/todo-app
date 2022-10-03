import { DragDropContext } from 'react-beautiful-dnd';
import TodoForm from '../todos/TodosForm';
import TodosList from '../todos/TodosList';

const DisplayTodos = () => {
    return (
        <>
            <h1>Todo's</h1>
            <TodoForm />
            <DragDropContext>
            <TodosList />
            </DragDropContext>
        </>
    );
};

export default DisplayTodos;
