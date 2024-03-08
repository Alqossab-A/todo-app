import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../app/shared/baseUrl';

export const fetchSubTodos = createAsyncThunk(
    'subTodos/fetchSubTodos',
    async () => {
        const response = await fetch(baseUrl + 'subTodos', {
            credentials: 'include',
        });

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
        if (subTodo.subText === '') {
            return Promise.reject('empty input');
        }

        const response = await fetch(baseUrl + 'subTodos', {
            method: 'POST',
            body: JSON.stringify(subTodo),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
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
        const response = await fetch(baseUrl + `subTodos/${subTodo._id}`, {
            method: 'PUT',
            body: JSON.stringify(subTodo),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        if (!response.ok) {
            return Promise.reject(response.status);
        }
    }
);

export const deleteSubTodo = createAsyncThunk(
    'subTodos/deleteSubTodo',
    async (subTodo) => {
        const response = await fetch(baseUrl + `subTodos/${subTodo._id}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        if (!response.ok) {
            return Promise.reject(response.status);
        }

        if (response.ok) {
            return { _id: subTodo._id };
        }
    }
);

export const updateSubTodoDone = createAsyncThunk(
    'subTodos/updateSubTodoDone',
    async (subTodo) => {
        const response = await fetch(baseUrl + `subTodos/${subTodo._id}`, {
            method: 'PUT',
            body: JSON.stringify(subTodo),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        if (!response.ok) {
            return Promise.reject(response.status);
        }

        const data = await response.json();
        return data;
    }
);

const initialState = {
    subTodosArray: [],
    isLoading: false,
    errMsg: '',
};

const subTodosSlice = createSlice({
    name: 'subTodos',
    initialState,
    reducers: {
        addSubTodo: (state, action) => {
            const newSubTodo = {
                ...action.payload,
            };
            state.subTodosArray.push(newSubTodo);
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
                    (action.error
                        ? action.error.message
                        : 'Please provide a valid input')
            );
        },
        [deleteSubTodo.fulfilled]: (state, action) => {
            const deletedSubTodoId = action.payload._id;

            const updatedSubTodosArray = state.subTodosArray.filter(
                (subTodo) => subTodo._id !== deletedSubTodoId
            );

            state.subTodosArray = updatedSubTodosArray;
        },
        [updateSubTodoDone.fulfilled]: (state, action) => {
            const updateSubTododoneID = action.payload._id;

            const updatedSubTodosArray = state.subTodosArray.filter(
                (subTodo) => subTodo._id !== updateSubTododoneID
            );

            state.subTodosArray = updatedSubTodosArray;
        },
    },
});

export const selectAllSubTodos = (state) => {
    return state.subTodos.subTodosArray;
};

export const subTodoReducer = subTodosSlice.reducer;

export const { addSubTodo, updateSubTodos } = subTodosSlice.actions;
