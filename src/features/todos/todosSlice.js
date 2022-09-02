import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../app/shared/baseUrl';

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
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
    async (todo, { dispatch }) => {
        const response = await fetch(baseUrl + 'todos', {
            method: 'POST',
            body: JSON.stringify(todo),
            headers: {'Content-Type':'application/json'},
        });

        if (!response.ok) {
            return Promise.reject(response.status)
        }

        const data = await response.json();
        dispatch(addTodo(data));
    }
);

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async (id, { dispatch }) => {
        const response = await fetch(baseUrl + `todos/${id}`,{
            method: 'DELETE',
            body: JSON.stringify(id),
        });

        if (!response.ok) {
            return Promise.reject(response.status)
        }

        const data = await response.json();
        dispatch(deleteTodo(data));
        console.log(data)
    }
)

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
            const newTodo = {
                id: state.todosArray.length + 1,
                ...action.payload,
            };
            state.todosArray.push(newTodo);
        },
        deleteTodo: (state, action) => {
            console.log(action)
            const todoId = action.payload.id
            return state.todosArray.filter((todo) => todo.id !== todoId);
        }
    },
    extraReducers: {
        [fetchTodos.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchTodos.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            state.todosArray = action.payload;
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

export const selectAllTodos = (state) => {
    return state.todos.todosArray;
};

export const todoReducer = todosSlice.reducer;

export const { addTodo, removeTodo } = todosSlice.actions;
