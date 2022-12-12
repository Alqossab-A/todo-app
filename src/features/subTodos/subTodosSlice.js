import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../app/shared/baseUrl';

export const fetchSubTodos = createAsyncThunk(
    'subTodos/fetchSubTodos',
    async () => {
        const response = await fetch(baseUrl + 'subTodos');

        if (!response.ok) {
            return Promise.reject('Unable to fetch, status:' + response.status);
        }

        const data = await response.json();
        return data;
    }
);

export const postSubTodo = createAsyncThunk(
    'subTodos/postSubTodo',
    async (subTodo, { dispatch }) => {
        const response = await fetch(baseUrl + 'subTodos', {
            method: 'POST',
            body: JSON.stringify(subTodo),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            return Promise.reject(response.status);
        }

        const data = await response.json();
        dispatch(addSubTodo(data));
    }
);

export const updateSubTodo = createAsyncThunk(
    'subTodos/updateSubTodo',
    async (subTodo) => {
        const response = await fetch(baseUrl + `subTodos/${subTodo.id}`, {
            method: 'PUT',
            body: JSON.stringify(subTodo),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            return Promise.reject(response.status);
        }
    }
);

export const deleteSubTodo = createAsyncThunk(
    'subTodos/deleteSubTodo',
    async (subTodo) => {
        const response = await fetch(baseUrl + `subTodos/${subTodo.id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            return Promise.reject(response.status);
        }

        if (response.ok) {
            return { id: subTodo.id };
        }
    }
);

export const updateSubTodoDone = createAsyncThunk(
    'subTodos/updateSubTodoDone',
    async (subTodo, { dispatch }) => {
        console.log('updateSubTodoDone called with subTodo:', subTodo); // Log subTodo being sent in request
        const response = await fetch(baseUrl + `subTodos/${subTodo.id}`, {
            method: 'PUT',
            body: JSON.stringify(subTodo),
            headers: { 'Content-Type': 'application/json' },
        });

        console.log('updateSubTodoDone response:', response); // Log response from JSON server

        if (!response.ok) {
            return Promise.reject(response.status);
        }

        const data = await response.json();
        dispatch(updateSubTodoDone.fulfilled(data));
    }
);

const initialState = {
    subTodosArray: [],
    isLoading: true,
    errMsg: '',
};

const subTodosSlice = createSlice({
    name: 'subTodos',
    initialState,
    reducers: {
        addSubTodo: (state, action) => {
            const newSubTodo = {
                id: state.subTodosArray.length + 1,
                ...action.payload,
            };
            state.subTodosArray.push(newSubTodo);
        },
        sortSubTodo: (state, action) => {
            console.log('sortSubTodo action.payload:', action.payload);
            state.subTodosArray = action.payload;
        },
    },
    extraReducers: {
        [fetchSubTodos.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchSubTodos.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            state.subTodosArray = action.payload;
        },
        [fetchSubTodos.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = action.error ? action.error.message : 'Fetch Failed';
        },
        [postSubTodo.rejected]: (action) => {
            alert(
                'Your todo could not be posted\nError: ' +
                    (action.error ? action.error.message : 'Fetch failed')
            );
        },
        [deleteSubTodo.fulfilled]: (state, action) => {
            state.subTodosArray = state.subTodosArray.filter(
                (subTodo) => subTodo.id !== action.payload.id
            );
        },
        [updateSubTodoDone.fulfilled]: (state, action) => {
            // Retrieve the updated subtodo from the action payload
            const updatedSubTodo = action.payload;

            // Find the index of the subtodo in the global state
            const index = state.subTodosArray.findIndex(
                (subTodo) => subTodo.id === updatedSubTodo.id
            );

            // Update the subtodo in the global state
            state.subTodosArray[index] = {
                ...updatedSubTodo,
                done: updatedSubTodo.done, // Set the 'done' property based on the value in the action payload
            };
        },
    },
});

export const selectAllSubTodos = (state) => {
    return state.subTodos.subTodosArray;
};

export const selectSubTodosById = (id) => (state) => {
    return state.subTodos.subTodosArray.find(
        (subTodo) => subTodo.id === parseInt(id)
    );
};

export const subTodoReducer = subTodosSlice.reducer;

export const { addSubTodo, updateSubTodos, sortSubTodo, sendToHistory } =
    subTodosSlice.actions;
