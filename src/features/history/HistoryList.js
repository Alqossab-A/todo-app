import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllHistory } from './historySlice';

import History from './History';

const HistoryList = () => {
    const [show, setShow] = useState(false);

    const history = useSelector(selectAllHistory);

    return (
        <>
            <button onClick={() => setShow(!show)}>history</button>
            <div className='HistoryTodo'>
                {show? history
                    .map((history) => {
                        return <History />;
                    }): null}
            </div>
        </>
    );
};

export default HistoryList;
