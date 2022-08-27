import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import { fetchTodos } from './features/todos/todosSlice';
import HomePage from './pages/HomePage';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  },[dispatch]);

  return (
    <div className='App'>
      <HomePage />
    </div>
  );
}

export default App;
