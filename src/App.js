import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSubTodos } from './features/subTodos/subTodosSlice';
import { fetchTodos } from './features/todos/todosSlice';
import { fetchWeekly } from './features/weekly/weeklySlice';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ContactPage from './pages/ContactPage';
import './App.css';

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
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='login' element={<LoginPage />} />
                <Route path='signup' element={<SignUpPage />} />
                <Route path='contact' element={<ContactPage />} />
            </Routes>
        </div>
    );
}

export default App;
