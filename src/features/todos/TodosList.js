import { useSelector } from 'react-redux';
import Todos from './Todos';
import Loading from '../../components/Loading';
import Error from '../../components/Error';

const TodosList = () => {
    const isLoading = useSelector((state) => state.todos.isLoading);
    const errMsg = useSelector((state) => state.todos.errMsg);

    if (isLoading) {
        return (
            <Loading />
        );
    }

    if (errMsg) {
        return (
            <Error errMsg={errMsg} />
        );
    }

    if ( Todos && Todos.length > 0) {
        return (
            <>
                {Todos.map((todos) => {
                    return <Todos todos={todos} />
                })}
            </>
        );
    };

    return (
        <p>
            There are no commetns for this campsite yet.
        </p>
    );
};

export default TodosList;