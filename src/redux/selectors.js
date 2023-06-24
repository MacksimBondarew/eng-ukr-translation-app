import { createSelector } from "@reduxjs/toolkit";

export const selectWords = state => state.words.items;
export const selectCheckedsWords = createSelector([selectWords] , (words) => {
    return words.filter(word => word.checked);
})