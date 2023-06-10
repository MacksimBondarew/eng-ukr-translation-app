import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://64845fa2ee799e3216269823.mockapi.io';

export const getWords = createAsyncThunk(
    'words/getWords',
    async (_, thunkApi) => {
        try {
            const response = await axios.get('/words');
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const deleteWord = createAsyncThunk(
    'words/deleteWord',
    async (id, thunkApi) => {
        try {
            const response = await axios.delete(`/words/${id}`);
            return response.data.id;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const editWord = createAsyncThunk(
    'words/editWord',
    async (word, thunkApi) => {
        try {
            const response = await axios.put(`/words/${word.id}`, word);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const addWord = createAsyncThunk(
    'words/addWord',
    async (word, thunkApi) => {
        try {
            const response = await axios.post(`/words`, word);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const checkWord = createAsyncThunk(
    'words/checkWord',
    async (word, thunkApi) => {
        try {
            const response = await axios.put(`/words/${word.id}`, word);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);
