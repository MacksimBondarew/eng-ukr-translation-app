import { createSlice } from '@reduxjs/toolkit';
import {
    getWords,
    deleteWord,
    editWord,
    addWord,
    checkWord,
} from './operations';

const initialState = {
    items: [],
    error: null,
    isLoading: false,
};

const wordsSlice = createSlice({
    name: 'words',
    initialState,
    extraReducers: builder => {
        builder
            .addCase(getWords.pending, state => {
                state.isLoading = true;
            })
            .addCase(getWords.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
                state.error = null;
            })
            .addCase(getWords.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(deleteWord.pending, state => {
                state.isLoading = true;
            })
            .addCase(deleteWord.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.items.findIndex(
                    word => word.id === action.payload
                );
                state.items.splice(index, 1);
                state.error = null;
            })
            .addCase(deleteWord.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(editWord.pending, state => {
                state.isLoading = true;
            })
            .addCase(editWord.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.items.findIndex(
                    word => word.id === action.payload.id
                );
                state.items.splice(index, 1, action.payload);
                state.error = null;
            })
            .addCase(editWord.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(addWord.pending, state => {
                state.isLoading = true;
            })
            .addCase(addWord.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items.push(action.payload);
                state.error = null;
            })
            .addCase(addWord.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(checkWord.pending, state => {
                state.isLoading = true;
            })
            .addCase(checkWord.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.items.findIndex(
                    word => word.id === action.payload.id
                );
                state.items.splice(index, 1, action.payload);
                state.error = null;
            })
            .addCase(checkWord.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: wordsReducer } = wordsSlice;
