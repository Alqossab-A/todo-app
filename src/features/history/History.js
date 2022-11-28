import { useSelector } from 'react-redux';
import { selectAllTodos } from '../todos/todosSlice';
import ArchivedTodo from './ArchivedTodo';
import ArchivedSubTodo from './ArchivedSubTodo';

const History = () => {
    const todos = useSelector(selectAllTodos);

    return (
        <>
            <div className='HistoryTodo'>
                {todos
                    .filter((todo) => todo.completed === true)
                    .map((todo) => {
                        return <ArchivedTodo key={todo.id} todo={todo} />;
                    })}
            </div>

            <div className='HistorySubTodo'>
                {todos
                    .filter((todo) => todo.done === true)
                    .map((todo) => {
                        return <ArchivedSubTodo key={todo.id} todo={todo} />;
                    })}
            </div>
        </>
    );
};

export default History;
