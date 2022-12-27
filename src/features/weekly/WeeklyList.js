import { useSelector } from 'react-redux';
import React, { useMemo } from 'react';

import Loading from '../../components/Loading';
import Weekly from './Weekly';
import Error from '../../components/Error';


const WeeklyList = () => {
    // const dispatch = useDispatch();

    const weekly = useSelector((state) => state.weekly.weeklyArray);
    const memoizedWeekly = useMemo(() => weekly, [weekly]);

    const isLoading = useSelector((state) => state.weekly.isLoading);
    const errMsg = useSelector((state) => state.weekly.errMsg);

    if (isLoading) {
        return <Loading />;
    }

    if (errMsg) {
        return <Error errMsg={errMsg} />;
    }

    if (memoizedWeekly && memoizedWeekly.length >= 0) {
        return (
            <>
                <div className='TodoListContainer'>
                    {memoizedWeekly.map((weekly, index) => {
                        return <Weekly key={index} weekly={weekly} index={index} />;
                    })}
                </div>
            </>
        );
    }

    return ''
};

export default WeeklyList;
