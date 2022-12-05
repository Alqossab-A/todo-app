import logger from 'redux-logger'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { todoReducer } from '../features/todos/todosSlice';
import { subTodoReducer } from '../features/subTodos/subTodosSlice';
import { historyReducer } from '../features/history/historySlice';

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    subTodos: subTodoReducer,
    history: historyReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([logger])
});
