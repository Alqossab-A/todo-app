import { useDispatch } from 'react-redux';
import { deleteTodo } from './todosSlice';

const Todos = ({ todo }) => {
    const { text } = todo;

    const dispatch = useDispatch();

    return (
        <>
            <li>
                {text}{' '}
                <button
                    onClick={() => {
                        dispatch(deleteTodo(todo.id));
                    }}
                >
                    Delete
                </button>
            </li>
        </>
    );
};

export default Todos;
