import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { addBookResponse } from "../api/types";

interface BooksState {
  book: { [userId: string]: addBookResponse[] } | null;
}

const initialState: BooksState = { book: null };

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBook(
      state,
      action: PayloadAction<{
        userId: string;
        book: addBookResponse;
      }>
    ) {
      if (!state.book) {
        state.book = {};
      }
      const { userId, book } = action.payload;
      if (!state.book[userId]) {
        state.book[userId] = [];
      }
      state.book[userId].push(book);

      localStorage.setItem(
        `books_${userId}`,
        JSON.stringify(state.book[userId])
      );
    },
    loadBooks(state, action: PayloadAction<string>) {
      const userId = action.payload;
      const books = localStorage.getItem(`books_${userId}`);
      if (books) {
        try {
          state.book = {
            ...state.book,
            [userId]: JSON.parse(books),
          };
        } catch (error) {
          console.error("Error parsing books from localStorage:", error);
        }
      }
    },
    removeBook(
      state,
      action: PayloadAction<{
        userId: string;
        bookId: string;
      }>
    ) {
      const { userId, bookId } = action.payload;
      if (state.book && state.book[userId]) {
        state.book[userId] = state.book[userId].filter(
          (book) => book._id !== bookId
        );

        localStorage.setItem(
          `books_${userId}`,
          JSON.stringify(state.book[userId])
        );
      }
    },
  },
});

export const selectBooksByUser = (state: RootState, userId: string) => {
  const book = state.book.book;
  return book ? book[userId] || null : null;
};
export const { setBook, loadBooks, removeBook } = bookSlice.actions;
export default bookSlice.reducer;
