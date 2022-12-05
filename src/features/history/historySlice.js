import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../app/shared/baseUrl';

export const fetchHistory = createAsyncThunk('history/fetchhistory', async () => {
    const response = await fetch(baseUrl + 'history');

    if (!response.ok) {
        return Promise.reject('Unable to fetch, status:' + response.status);
    }

    const data = await response.json();
    return data;
});

const initialState = {
    historyArray: [],
    isLoading: true,
    errMsg: '',
};

const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchHistory.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchHistory.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            state.historyArray = action.payload;
        },
        [fetchHistory.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = action.error ? action.error.message : 'Fetch Failed';
        }
    },
});

export const selectAllHistory = (state) => {
    return state.history.historyArray;
};

export const selectHistoryById = (id) => (state) => {
    return state.history.historyArray.find((history) => history.id === parseInt(id));
};

export const historyReducer = historySlice.reducer;

export const {  } = historySlice.actions;
