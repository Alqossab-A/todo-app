import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteExpiredSubTodos } from '../features/subTodos/subTodosSlice';

export const useCheckExpired = _ =>  {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(deleteExpiredSubTodos());
    }, [dispatch]);
}
