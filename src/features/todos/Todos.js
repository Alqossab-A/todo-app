import { useDispatch } from 'react-redux';
import { deleteTodo } from './todosSlice';

const Todos = ({ todo }) => {
    const { text } = todo;

    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteTodo({ id}));
    };

    return (
        <>
            <li>{text} <button onClick={handleDelete}>Delete</button></li>
        </>
    );
};

export default Todos;
