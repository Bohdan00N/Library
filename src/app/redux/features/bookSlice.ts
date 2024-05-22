import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { addBookResponse } from "../api/types";
import { produce } from 'immer';

interface BooksState {
  [userId: string]: addBookResponse[];
}

const initialState: BooksState = {};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBook: (
      state,
      action: PayloadAction<{
        userId: string;
        book: addBookResponse;
      }>
    ) => {
      const { userId, book } = action.payload;
      state = produce(state, draftState => {
        if (draftState[userId]) {
          draftState[userId] = [...draftState[userId], book];
        } else {
          draftState[userId] = [book];
        }
      });
    },
    loadBooks: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      const books = localStorage.getItem(`books_${userId}`);
      if (books) {
        state[userId] = JSON.parse(books);
      } else {
        state[userId] = [];
      }
    },
    clearBooks: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      delete state[userId];
      localStorage.removeItem(`books_${userId}`);
    },
  },
});
export const selectBooksByUser = (state: RootState, userId: string) =>
  state.book[userId] || [];
export const { setBook } = bookSlice.actions;
export default bookSlice.reducer;
