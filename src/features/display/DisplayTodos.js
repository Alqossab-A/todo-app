import TodoForm from '../todos/TodosForm';
import TodosList from '../todos/TodosList';

const DisplayTodos = () => {
    return (
        <>
            <h1>Todo's</h1>
            <TodoForm />
            <li>
                <TodosList />
            </li>
        </>
    );
};

export default DisplayTodos;
