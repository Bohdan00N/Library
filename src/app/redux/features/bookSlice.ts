// import { userData } from './../api/types';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { addBookResponse } from "../api/types";
// import { AuthState } from "./authSlice";
// import { selectUserId } from "./selectors";


const initialState: addBookResponse[] = [];

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBook: (
      state,
      action: PayloadAction<{
        userId:  string;  
        book: addBookResponse;
      }>
    ) => {
      const actualUserEmail =  action.payload.userId ;
      if (actualUserEmail) {
        localStorage.setItem(
          `book_${action.payload.userId}`,
          JSON.stringify(action.payload.book)
        );
      }
      console.log(action.payload.userId);
      state.push(action.payload.book);
    },
  },
});
export const selectBook = (state: RootState) => state.book;
export const { setBook } = bookSlice.actions;
export default bookSlice.reducer;
