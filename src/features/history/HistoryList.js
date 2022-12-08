import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import History from './History';

const HistoryList = () => {
    const dispatch = useDispatch();
    const isMounted = useRef();
    const [show, setShow] = useState(false);

    const history = useSelector((state) => state.subTodos.subTodosArray);

    // useEffect(() => {
    //     if (isMounted.current) return;

    //     dispatch(fetchHistory());

    //     isMounted.current = true;
    // }, [dispatch]);

    return (
        <>
            <button onClick={() => setShow(!show)}>history</button>
            <div className='HistoryTodo'>
                {show
                    ? history.map((history) => {
                          return <History history={history} />;
                      })
                    : null}
            </div>
        </>
    );
};

export default HistoryList;
