import { createSlice } from "@reduxjs/toolkit";
const initialState = {};
const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        setBook: (state, action) => {
            const { userId, book } = action.payload;
            if (state[userId]) {
                state[userId].push(book);
            }
        },
        loadBooks: (state, action) => {
            const userId = action.payload;
            const books = localStorage.getItem(`books_${userId}`);
            if (books) {
                state[userId] = JSON.parse(books);
            }
            else {
                state[userId] = [];
            }
        },
        clearBooks: (state, action) => {
            const userId = action.payload;
            delete state[userId];
            localStorage.removeItem(`books_${userId}`);
        },
    },
});
export const selectBooksByUser = (state, userId) => state.book[userId] || [];
export const { setBook, loadBooks } = bookSlice.actions;
export default bookSlice.reducer;
