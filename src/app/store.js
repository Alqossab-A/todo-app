import logger from 'redux-logger'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { todoReducer } from '../features/todos/todosSlice';
import { subTodoReducer } from '../features/subTodos/subTodosSlice';
import { weeklyReducer } from '../features/weekly/weeklySlice';

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    subTodos: subTodoReducer,
    weekly: weeklyReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([logger])
});
