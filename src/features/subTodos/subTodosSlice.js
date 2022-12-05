import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../app/shared/baseUrl';

export const fetchSubTodos = createAsyncThunk('subTodos/fetchSubTodos', async () => {
    const response = await fetch(baseUrl + 'subTodos');

    if (!response.ok) {
        return Promise.reject('Unable to fetch, status:' + response.status);
    }

    const data = await response.json();
    return data;
});

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

export const updateSubTodo = createAsyncThunk('subTodos/updateSubTodo', async (subTodo) => {
    const response = await fetch(baseUrl + `subTodos/${subTodo.id}`, {
        method: 'PUT',
        body: JSON.stringify(subTodo),
        headers: { 'Content-Type': 'application/json' },
    });
    
    if (!response.ok) {
        return Promise.reject(response.status);
    }
});

export const deleteSubTodo = createAsyncThunk('subTodos/deleteSubTodo', async (subTodo) => {
    const response = await fetch(baseUrl + `subTodos/${subTodo.id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        return Promise.reject(response.status);
    }

    if (response.ok) {
        return { id: subTodo.id };
    }
});

export const updateSubTodoDone = createAsyncThunk(
    'subTodos/updateSubTodoDone',
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
    },
});

export const selectAllSubTodos = (state) => {
    return state.subTodos.subTodosArray;
};

export const selectSubTodosById = (id) => (state) => {
    return state.subTodos.subTodosArray.find((subTodo) => subTodo.id === parseInt(id));
};

export const subTodoReducer = subTodosSlice.reducer;

export const { addSubTodo, updateSubTodos, sortSubTodo } = subTodosSlice.actions;
