import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useCheckExpired } from '../../utils/useCheckExpired';
import History from './History';

const HistoryList = () => {
    const [show, setShow] = useState(false);

    useCheckExpired();

    const combinedArray = useSelector((state) => [
        ...state.subTodos.subTodosArray,
        ...state.todos.todosArray,
    ]);

    const sortedArray = combinedArray
        .filter((item) => item.done === true || item.completed === true)
        .sort((a, b) => (a.dateToDelete > b.dateToDelete ? -1 : 1));

    return (
        <>
            <button onClick={() => setShow(!show)}>history</button>
            {show && (
                <div className='HistoryTodo'>
                    {sortedArray.map((history, index) => {
                        return <History key={index} history={history} />;
                    })}
                </div>
            )}
        </>
    );
};

export default HistoryList;
