import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LOADING } from "../constants";
import { createRecord, deleteRecord, getAllRecords } from "../services/recordService";


export const postNewRecord = createAsyncThunk(
    'newRecord',
    async (params, { rejectWithValue }) => {
        try {
            const response = await createRecord(params);
            return response.data;
        } catch (e) {
            console.log(e.response.data, 'ERROR');
            return rejectWithValue(e.response.data.message || String(e.response.data));
        }
    }
);

export const fetchAllRecords = createAsyncThunk(
    'fetchAllRecords',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getAllRecords();
            return response.data;
        } catch (e) {
            console.log(e.response.data);
            return rejectWithValue(e.response.data.message || String(e.response.data));
        }
    }
);

export const removeRecord = createAsyncThunk(
    'removeRecord',
    async (id, { rejectWithValue }) => {
        try {
            const response = await deleteRecord(id);
            return response.data;
        } catch (e) {
            console.log(e.response.data);
            return rejectWithValue(e.response.data.message || String(e.response.data));
        }
    }
);

const recordSlice = createSlice({
    name: 'record',
    initialState: {
        newRecord: {
            isLoading: LOADING.INITIAL,
            data: null,
            error: null,
        },
        allRecords: {
            isLoading: LOADING.INITIAL,
            data: null,
            error: null,
        },
        removeRecord: {
            isLoading: LOADING.INITIAL,
            data: null,
            error: null,
        }
    },
    reducers: {
        resetNewRecordLoadingState: (state) => {
            state.newRecord.isLoading = LOADING.INITIAL;
        },
        resetRemoveRecordLoadingState: (state) => {
            state.removeRecord.isLoading = LOADING.INITIAL;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(postNewRecord.pending, (state) => {
                state.newRecord.isLoading = LOADING.PENDING;
            })
            .addCase(postNewRecord.fulfilled, (state, action) => {
                state.newRecord.data = action.payload;
                state.newRecord.isLoading = LOADING.FULFILLED;
            })
            .addCase(postNewRecord.rejected, (state, action) => {
                state.newRecord.error = action.payload;
                state.newRecord.isLoading = LOADING.REJECTED;
            })

            .addCase(fetchAllRecords.pending, (state) => {
                state.allRecords.isLoading = LOADING.PENDING;
            })
            .addCase(fetchAllRecords.fulfilled, (state, action) => {
                state.allRecords.data = action.payload;
                state.allRecords.isLoading = LOADING.FULFILLED;
            })
            .addCase(fetchAllRecords.rejected, (state, action) => {
                state.allRecords.error = action.payload;
                state.allRecords.isLoading = LOADING.REJECTED;
            })

            .addCase(removeRecord.pending, (state) => {
                state.removeRecord.isLoading = LOADING.PENDING;
            })
            .addCase(removeRecord.fulfilled, (state, action) => {
                state.removeRecord.data = action.payload;
                state.removeRecord.isLoading = LOADING.FULFILLED;
            })
            .addCase(removeRecord.rejected, (state, action) => {
                state.removeRecord.error = action.payload;
                state.removeRecord.isLoading = LOADING.REJECTED;
            })
    }
});

export const selectNewRecordData = (state) => state.record.newRecord;

export const selectAllRecordsData = (state) => state.record.allRecords;

export const selectRemoveRecordData = (state) => state.record.removeRecord;

export const { resetNewRecordLoadingState, resetRemoveRecordLoadingState } = recordSlice.actions;

export default recordSlice.reducer;