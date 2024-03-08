import logger from 'redux-logger'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { todoReducer } from '../features/todos/todosSlice';
import { subTodoReducer } from '../features/subTodos/subTodosSlice';
import { extraTodoReducer } from '../features/extraTodos/extraTodosSlice';
import { userReducer } from '../features/user/userSlice';
import { noteReducer } from '../features/notes/notesSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    todos: todoReducer,
    subTodos: subTodoReducer,
    extraTodos: extraTodoReducer,
    notes: noteReducer,
  },
  // comment for deployment
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([logger])
});
