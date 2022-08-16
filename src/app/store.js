import logger from 'redux-logger'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { todoReducer } from '../features/todos/todosSlice';

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([logger])
});
