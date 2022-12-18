import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteExpiredSubTodos } from '../features/subTodos/subTodosSlice';
import { deleteExpiredTodo } from '../features/todos/todosSlice';

export const useCheckExpired = (_) => {
    const isMounted = useRef();
    const dispatch = useDispatch();
    const subTodoArray = useSelector((state) => state.subTodos.subTodosArray);
    const todoArray = useSelector((state) => state.todos.todosArray);

    useEffect(() => {
        if (isMounted.current) return;

        dispatch(deleteExpiredSubTodos());
        dispatch(deleteExpiredTodo());

        // Filter and sort combinedArray in-place
        const combinedArray = [...subTodoArray, ...todoArray];

        combinedArray
            .filter((item) => item.done === true || item.completed === true)
            .sort((a, b) => (a.dateToDelete > b.dateToDelete ? -1 : 1));

        isMounted.current = true;
    }, [dispatch, subTodoArray, todoArray]);
};
