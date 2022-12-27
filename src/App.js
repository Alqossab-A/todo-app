import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSubTodos } from './features/subTodos/subTodosSlice';
import { fetchTodos } from './features/todos/todosSlice';
import HomePage from './pages/HomePage';
import './App.css';
import { fetchWeekly } from './features/weekly/weeklySlice';

function App() {
    const isMounted = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isMounted.current) return;

        dispatch(fetchTodos());
        dispatch(fetchSubTodos());
        dispatch(fetchWeekly());

        isMounted.current = true;
    }, [dispatch]);

    return (
        <div className='App'>
            <HomePage />
        </div>
    );
}

export default App;
