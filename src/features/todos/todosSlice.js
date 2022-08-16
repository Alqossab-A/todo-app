import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../app/shared/baseUrl';

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodo',
    async () => {
        const response = await fetch(baseUrl + 'todos');
        if (!response.ok) {
            return Promise.reject('Unable to fetch, status:' + response.status);
        }
        const data = await response.json();
        return data;
    }
);

export const postTodo = createAsyncThunk(
    'todos/postTodo',
    async (todos, { dispatch }) => {
        const response = await fetch(baseUrl + 'todos', {
            method: 'POST',
            body: JSON.stringify(todos),
            headers: {'Content-Type':'application/json'},
        });

        if (!response.ok) {
            return Promise.reject(response.status)
        }
        const data = await response.json();
        dispatch(addTodo(data));
    }
);

const initialState = {
    todosArray: [],
    isLoading: true,
    errMsg: '',
};

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            console.log('addTodo action.payload:', action.payload);
            console.log('addTodo state.todosArray', action.todosArray);
            const newTodo = {
                id: state.todosArray.length + 1,
                ...action.payload,
            };
            state.todosArray.push(newTodo);
        },
    },
    extraReducers: {
        [fetchTodos.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchTodos.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            state.commentsArray = action.payload;
        },
        [fetchTodos.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = action.error ? action.error.message : 'Fetch Failed';
        },
        [fetchTodos.rejected]: (state, action) => {
            alert (
                'Your todo could not be posted\nError: ' +
                    (action.error ? action.error.message: 'Fetch failed')
            );
        }
    }
});

export const todoReducer = todosSlice.reducer;

export const { addTodo } = todosSlice.actions;
