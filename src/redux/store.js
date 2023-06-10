import { wordsReducer } from './wordsSlice';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    words: wordsReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});
