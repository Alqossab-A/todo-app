import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import { fetchTodos } from './features/todos/todosSlice';
import HomePage from './pages/HomePage';

function App() {
  const isMounted = useRef()
  const dispatch = useDispatch();

  useEffect(() => {
    if (isMounted.current) return

    dispatch(fetchTodos());

    isMounted.current = true;
  },[dispatch]);

  return (
    <div className='App'>
      <HomePage />
    </div>
  );
}

export default App;
