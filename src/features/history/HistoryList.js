import { useState } from 'react';
import { useSelector } from 'react-redux';

import History from './History';

const HistoryList = () => {
    const [show, setShow] = useState(false);

    const history = useSelector((state) => state.subTodos.subTodosArray);

    const completedSubTodos = history.filter(
        (subTodo) => subTodo.done === true
    );

    return (
        <>
            <button onClick={() => setShow(!show)}>history</button>
            <div className='HistoryTodo'>
                {show
                    ? completedSubTodos.map((history) => {
                          return <History history={history} />;
                      })
                    : null}
            </div>
        </>
    );
};

export default HistoryList;
