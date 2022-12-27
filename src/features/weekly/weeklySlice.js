import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../app/shared/baseUrl';

export const fetchWeekly = createAsyncThunk('weekly/fetchWeekly', async () => {
    const response = await fetch(baseUrl + 'weekly');

    if (!response.ok) {
        return Promise.reject('Unable to fetch, status:' + response.status);
    }

    const data = await response.json();
    return data;
});

export const updateWeekly = createAsyncThunk(
    'weekly/updateWeekly',
    async (weekly) => {
        const response = await fetch(baseUrl + `weekly/${weekly.id}`, {
            method: 'PUT',
            body: JSON.stringify(weekly),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            return Promise.reject(response.status);
        }
    }
);

const initialState = {
    weeklyArray: [],
    isLoading: true,
    errMsg: '',
};

const weeklySlice = createSlice({
    name: 'weekly',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchWeekly.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchWeekly.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            state.weeklyArray = action.payload;
        },
        [fetchWeekly.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = action.error ? action.error.message : 'Fetch Failed';
        },
    },
});

export const weeklyReducer = weeklySlice.reducer;
