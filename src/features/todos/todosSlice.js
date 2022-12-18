import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../app/shared/baseUrl';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const response = await fetch(baseUrl + 'todos');

    if (!response.ok) {
        return Promise.reject('Unable to fetch, status:' + response.status);
    }

    const data = await response.json();
    return data;
});

export const postTodo = createAsyncThunk(
    'todos/postTodo',
    async (todo, { dispatch }) => {
        const response = await fetch(baseUrl + 'todos', {
            method: 'POST',
            body: JSON.stringify(todo),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            return Promise.reject(response.status);
        }

        const data = await response.json();
        dispatch(addTodo(data));
    }
);

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (todo) => {
    const response = await fetch(baseUrl + `todos/${todo.id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        return Promise.reject(response.status);
    }

    if (response.ok) {
        return { id: todo.id };
    }
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async (todo) => {
    const response = await fetch(baseUrl + `todos/${todo.id}`, {
        method: 'PUT',
        body: JSON.stringify(todo),
        headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
        return Promise.reject(response.status);
    }
});

export const updateTodoStatus = createAsyncThunk(
    'todos/updateTodoStatus',
    async (todo) => {
        const response = await fetch(baseUrl + `todos/${todo.id}`, {
            method: 'PUT',
            body: JSON.stringify(todo),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            return Promise.reject(response.status);
        }
    }
);

export const deleteExpiredTodo = createAsyncThunk(
    'todos/deleteExpiredTodo',
    async ({ dispatch }) => {
        const currentTime = Date.now();

        // Send a GET request to retrieve the todos array from the server
        const response = await fetch(baseUrl + 'todos');

        if (!response.ok) {
            return Promise.reject('Unable to fetch, status:' + response.status);
        }

        const data = await response.json();

        // Filter the todos array by the dateToDelete
        const expiredTodos = data.filter (
            (todo) => todo.dateToDelete <= currentTime
        );

        // Send a DELETE request to delete the expired todos from the server
        for (const todo of expiredTodos) {
            await fetch(baseUrl + `todos/${todo.id}`, {
                method: 'DELETE',
            });
        }

        // Dispatch an action to update the todosArray in the store
        dispatch(fetchTodos());
    }
)

export const updateTodoComplete = createAsyncThunk(
    'todos/updateTodoComplete',
    async (todo) => {
        const response = await fetch(baseUrl + `todos/${todo.id}`, {
            method: 'PUT',
            body: JSON.stringify(todo),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            return Promise.reject(response.status);
        }

        const data = await response.json();
        return data;
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
            const newTodo = {
                id: state.todosArray.length + 1,
                ...action.payload,
            };
            state.todosArray.push(newTodo);
        },
        sortTodo: (state, action) => {
            console.log('sortTodo action.payload:', action.payload);
            state.todosArray = action.payload;
        },
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
        [postTodo.rejected]: (action) => {
            alert(
                'Your todo could not be posted\nError: ' +
                    (action.error ? action.error.message : 'Fetch failed')
            );
        },
        [deleteTodo.fulfilled]: (state, action) => {
            state.todosArray = state.todosArray.filter(
                (todo) => todo.id !== action.payload.id
            );
        },
        [updateTodoComplete.fulfilled]: (state, action) => {
            // Retrieve the updated subtodo from the action payload
            const updatedTodo = action.payload;

            // Find the index of the todo in the global state
            const index = state.todosArray.findIndex(
                (todo) => todo.id === updatedTodo.id
            );

            // Update the todo in the global state
            state.todosArray[index] = updatedTodo;
        },
    },
});

export const selectAllTodos = (state) => {
    return state.todos.todosArray;
};

export const selectTodosById = (id) => (state) => {
    return state.todos.todosArray.find((todo) => todo.id === parseInt(id));
};

export const todoReducer = todosSlice.reducer;

export const { addTodo, updateTodos, sortTodo } = todosSlice.actions;
